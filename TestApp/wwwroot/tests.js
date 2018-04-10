//QUnit.cases.combinatorial([
//    { a: 1, b: 1, expectedSum: 2 }
//])
//    .test("Sum test", function (params, assert) {
//        var actualSum = params.a + params.b;
//        assert.equal(actualSum, params.expectedSum);
//    });


QUnit.cases
    .combinatorial([
        { orderby: "PersonID " },
        { orderby: "-PersonID mod 4 " },
        { orderby: "tolower(FullName) " }
    ])
    .combinatorial([
        { dir: "asc" },
        { dir: "desc" }
    ])
    .combinatorial([
        { filter1: "PersonID lt 1000" },
        { filter1: "PersonID gt 100" }
    ])
    .combinatorial([
        { filter2: " and length(FullName) gt 10" },
        { filter2: " or year(ValidTo) lt 2100" },
        { filter2: "" }
    ])
    .combinatorial([
        { param: "$skip=5&$top=10" },
        { param: "$select=PersonID,FullName&$skip=10" },
        { filter2: "" }
    ])
    .test("query test", function(params, assert) {
    var done = assert.async();
        var data = null;
        $.ajax("/odata?$orderby=" + params.orderby + params.dir +
            "&$filter=" + params.filter1 + params.filter2 +
            "&" + params.param, { dataType: "json" })
        .done(result => {
            assert.ok(result.value !== null, "Response is retrieved");
        });
        setTimeout(done,1000);
    });