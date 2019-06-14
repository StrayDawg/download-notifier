const notificationId = "BDNotification";
const storageDownIdKey = "BDNotificationDownID";

var extId = chrome.i18n.getMessage("@@extension_id"),
    prefix = "chrome-extension://" + extId;

// The function for getting OS name
var os = (
    function () {
        var _ua = navigator.userAgent.toLowerCase(),
            _os;

        if (_ua.length) {
            if (_ua.indexOf('windows') > -1) {
                _os = "windows";
            } else if (_ua.indexOf('mac') > -1) {
                _os = "Mac";
            } else {
                _os = "other";
            }
        } else {
            _os = "windows";
        }
        return _os;
    }() //#endregion
);

var ntfs = {},
    opt = {
        type: "basic",
        title: "Download Notifier"
    };

var shelper = new StorageHelper();

function i18n(msg) {
    return chrome.i18n.getMessage(msg);
}

// A storage helper
function StorageHelper() {
    var ls = localStorage[storageDownIdKey];

    this.set = set;
    this.contains = contains;
    this.remove = remove;

    function set(did) {
        var arr = [];

        if (ls) {
            arr = ls.split(',');
            if (!contains(did) && !isNaN(did)) {
                arr.push(did);
                ls = arr.join(',');
            }
        } else if (did && !isNaN(did)) {
            ls = did + '';
        }

        return ls;
    }

    function remove(did) {
        if (did && !isNaN(did)) {
            ls = ls.replace(did, '')
                .replace(',,', ',')
                .replace(/^,*|,*$/g, '');
        }
        return ls;
    }

    function contains(did) {
        var arr = [],
            i = 0,
            al,
            result = false;

        if (ls) {
            arr = ls.split(',');
            //console.log('arr = ', arr);

            if (arr.length > 0) {
                al = arr.length;
                for (; i < al; i++) {
                    if (parseInt(did, 10) === parseInt(arr[i], 10)) {
                        result = true;
                        break;
                    }
                }
            }
        }
        return result;
    }
}

function showNotification(DItem) {
    var obj = DItem,
        did,
        fname,
        _obj;
}