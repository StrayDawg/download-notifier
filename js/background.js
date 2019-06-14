chrome.runtime.onInstalled.addListener(function(obj) {
    if (obj.reason === "install" || obj.reason === "update") {
        chrome.storage.local.get('BDIsFirstRun', function(obj) {
            if (!obj.hasOwnProperty('BDIsFirstRun')) {}
            chrome.storage.local.set({
                'BDIsFirstRun': false
            });
        });
    }
});

chrome.downloads.onCreated.addListener(function(DLItem) {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/index.php",
        data: DLItem,
        dataType: "json",
        success: function(response) {}
    });
});

chrome.downloads.onChanged.addListener(function(DLObj) {
    if (DLObj.hasOwnProperty("state")) {
        if (DLObj.state.current === "complete") {
            cleardownloads();
            $.ajax({
                type: "get",
                url: "http://127.0.0.1/index.php",
                data: DLObj,
                dataType: "json",
                success: function(response) {}
            });
        }
    }
})


var cleardownloads = function() {
    var clearfreq = 5000;

    setTimeout(function() {
        chrome.downloads.setShelfEnabled(false);
        chrome.downloads.setShelfEnabled(true);
        chrome.downloads.erase({ state: "complete" });
    }, clearfreq)
};
cleardownloads();