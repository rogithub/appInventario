function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === "QuotaExceededError" ||
            // Firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
        );
    }
}

// check for storage
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

let setIdToStorage = () => {
    // if already set return it
    if (localStorage.getItem("id")) {
      return localStorage.getItem("id");
    }
    const urlParams = new URLSearchParams(window.location.search);
    const guid = urlParams.get('id');
    if (guid && guid.length === 36) {
        console.log(guid);
        localStorage.setItem("id", guid);
        return guid;
    }
    return undefined;
};

// Registering Service Worker
if ("serviceWorker" in navigator && storageAvailable("localStorage")) {
    setIdToStorage();
    navigator.serviceWorker
        .register("/sw.js")
        .then(registration => {
            console.log("Service Worker Registered");
            console.log(registration);
        }).catch(err => {
            console.log("Fail registering Service Worker");
            console.log(err);
        });
}