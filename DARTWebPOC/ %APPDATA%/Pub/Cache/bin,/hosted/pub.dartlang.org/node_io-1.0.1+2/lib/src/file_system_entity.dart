// Copyright (c) 2017, Anatoly Pulyaevskiy. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:io' as io;
import 'dart:js' as js;

import 'package:node_interop/fs.dart';
import 'package:node_interop/path.dart' as nodePath;

import 'directory.dart';
import 'platform.dart';

abstract class FileSystemEntity implements io.FileSystemEntity {
  static final RegExp _absoluteWindowsPathPattern =
      new RegExp(r'^(\\\\|[a-zA-Z]:[/\\])');

  @override
  bool get isAbsolute => nodePath.path.isAbsolute(path);

  @override
  String toString() => "$runtimeType: '$path'";

  static final RegExp _parentRegExp = Platform.isWindows
      ? new RegExp(r'[^/\\][/\\]+[^/\\]')
      : new RegExp(r'[^/]/+[^/]');

  static String parentOf(String path) {
    int rootEnd = -1;
    if (Platform.isWindows) {
      if (path.startsWith(_absoluteWindowsPathPattern)) {
        // Root ends at first / or \ after the first two characters.
        rootEnd = path.indexOf(new RegExp(r'[/\\]'), 2);
        if (rootEnd == -1) return path;
      } else if (path.startsWith('\\') || path.startsWith('/')) {
        rootEnd = 0;
      }
    } else if (path.startsWith('/')) {
      rootEnd = 0;
    }
    // Ignore trailing slashes.
    // All non-trivial cases have separators between two non-separators.
    int pos = path.lastIndexOf(_parentRegExp);
    if (pos > rootEnd) {
      return path.substring(0, pos + 1);
    } else if (rootEnd > -1) {
      return path.substring(0, rootEnd + 1);
    } else {
      return '.';
    }
  }

  @override
  io.Directory get parent => new Directory(parentOf(path));

  @override
  Future<String> resolveSymbolicLinks() {
    var completer = new Completer<String>();
    void callback(err, String resolvedPath) {
      if (err == null) {
        completer.complete(resolvedPath);
      } else {
        completer.completeError(err);
      }
    }

    var jsCallback = js.allowInterop(callback);

    fs.realpath(path, jsCallback);
    return completer.future;
  }

  @override
  String resolveSymbolicLinksSync() => fs.realpathSync(path);

  @override
  Future<FileStat> stat() => FileStat.stat(path);

  @override
  FileStat statSync() => FileStat.statSync(path);

  @override
  Uri get uri => new Uri.file(path, windows: Platform.isWindows);

  @override
  Stream<io.FileSystemEvent> watch(
      {int events: io.FileSystemEvent.all, bool recursive: false}) {
    // TODO: implement watch
    throw new UnimplementedError();
  }
}

/// A FileStat object represents the result of calling the POSIX stat() function
/// on a file system object.  It is an immutable object, representing the
/// snapshotted values returned by the stat() call.
class FileStat implements io.FileStat {
  @override
  final DateTime changed;

  @override
  final DateTime modified;

  @override
  final DateTime accessed;

  @override
  final io.FileSystemEntityType type;

  @override
  final int mode;

  @override
  final int size;

  FileStat._internal(this.changed, this.modified, this.accessed, this.type,
      this.mode, this.size);

  const FileStat._internalNotFound()
      : changed = null,
        modified = null,
        accessed = null,
        type = io.FileSystemEntityType.notFound,
        mode = 0,
        size = -1;

  factory FileStat._fromNodeStats(Stats stats) {
    var type = io.FileSystemEntityType.notFound;
    if (stats.isDirectory()) {
      type = io.FileSystemEntityType.directory;
    } else if (stats.isFile()) {
      type = io.FileSystemEntityType.file;
    } else if (stats.isSymbolicLink()) {
      type = io.FileSystemEntityType.link;
    }
    return new FileStat._internal(
      DateTime.parse(stats.ctime.toISOString()),
      DateTime.parse(stats.mtime.toISOString()),
      DateTime.parse(stats.atime.toISOString()),
      type,
      stats.mode,
      stats.size,
    );
  }

  /// Asynchronously calls the operating system's stat() function on [path].
  ///
  /// Returns a Future which completes with a [FileStat] object containing
  /// the data returned by stat(). If the call fails, completes the future with a
  /// [FileStat] object with `.type` set to FileSystemEntityType.notFound and
  /// the other fields invalid.
  static Future<FileStat> stat(String path) {
    var completer = new Completer<FileStat>();

    // stats has to be an optional param despite what the documentation says...
    void callback(err, [stats]) {
      if (err == null) {
        completer.complete(new FileStat._fromNodeStats(stats));
      } else {
        completer.complete(new FileStat._internalNotFound());
      }
    }

    var jsCallback = js.allowInterop(callback);
    fs.lstat(path, jsCallback);
    return completer.future;
  }

  /// Calls the operating system's stat() function on [path].
  ///
  /// Returns a [FileStat] object containing the data returned by stat().
  /// If the call fails, returns a [FileStat] object with .type set to
  /// FileSystemEntityType.notFound and the other fields invalid.
  static FileStat statSync(String path) {
    try {
      return new FileStat._fromNodeStats(fs.lstatSync(path));
    } catch (_) {
      return new FileStat._internalNotFound();
    }
  }

  @override
  String modeString() {
    var permissions = mode & 0xFFF;
    var codes = const ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'];
    var result = [];
    if ((permissions & 0x800) != 0) result.add("(suid) ");
    if ((permissions & 0x400) != 0) result.add("(guid) ");
    if ((permissions & 0x200) != 0) result.add("(sticky) ");
    result
      ..add(codes[(permissions >> 6) & 0x7])
      ..add(codes[(permissions >> 3) & 0x7])
      ..add(codes[permissions & 0x7]);
    return result.join();
  }

  @override
  String toString() => """
FileStat: type $type
          changed $changed
          modified $modified
          accessed $accessed
          mode ${modeString()}
          size $size""";
}
