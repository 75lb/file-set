var test = require("tape"),
    FileSet = require("../");

test("new Fileset(files)", function(t){
    var fileSet =  FileSet([ "test/fixture/*", "clive", "test/fixture/folder2/**" ]);
    t.deepEqual(fileSet.list, [
        { path: "test/fixture/file1", type: FileSet.FILE },
        { path: "test/fixture/folder1", type: FileSet.DIR },
        { path: "test/fixture/folder2", type: FileSet.DIR },
        { path: "clive", type: FileSet.NOEXIST },
        { path: "test/fixture/folder2/file3", type: FileSet.FILE },
        { path: "test/fixture/folder2/folder3", type: FileSet.DIR },
        { path: "test/fixture/folder2/folder3/file4", type: FileSet.FILE }
    ]);

    t.end();
});

test("fileSet.notExisting", function(t){
    var fileSet = new FileSet([ "test/fixture/*", "clive", "test/fixture/folder2/**" ]);

    t.deepEqual(fileSet.notExisting, [ "clive" ]);
    t.end();
});

test("fileSet.files", function(t){
    var fileSet = new FileSet([ "test/fixture/*", "clive", "test/fixture/folder2/**" ]);

    t.deepEqual(fileSet.files, [
        "test/fixture/file1",
        "test/fixture/folder2/file3",
        "test/fixture/folder2/folder3/file4"
    ]);
    t.end();
});

test("fileSet.dirs", function(t){
    var fileSet = new FileSet([ "test/fixture/*", "clive", "test/fixture/folder2/**" ]);
    t.deepEqual(fileSet.dirs, [
        "test/fixture/folder1",
        "test/fixture/folder2",
        "test/fixture/folder2/folder3"
    ]);
    t.end();
});
