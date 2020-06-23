// Example: https://developer.chrome.com/extensions/options

// Initialise the extension with data from language
document.title = chrome.i18n.getMessage('appName');
document.getElementById('appName').innerHTML = chrome.i18n.getMessage('appName');
document.getElementById('checkboxEnablingText').innerHTML = chrome.i18n.getMessage('checkboxEnablingText');
var version = document.getElementById('version'); // Save it in variable because search id is slower than a variable and i have to reuse it.
version.textContent += chrome.i18n.getMessage('version');
version.textContent += " " + chrome.runtime.getManifest().version;
document.getElementById('tester').textContent = chrome.i18n.getMessage('about');
document.getElementById('privacy').textContent = chrome.i18n.getMessage('privacy');

// Saves options to browser.storage
function save_options() 
{
	var enable_plugin = 1;

  	if(!document.getElementById('enable_plugin').checked)
	{
		enable_plugin = 0;
        browser.runtime.sendMessage('disabled');
	}
    else
    {
        // display icon as reenabled (plugin is active but no resources have been scanned)
        browser.runtime.sendMessage('reenabled');
    }


  	browser.storage.local.set({
  	    enable_plugin: enable_plugin
  	}, function() {});
}


// Restores select box and checkbox state using the preferences stored in browser.storage.
function restore_options() 
{
  browser.storage.local.get({
    enable_plugin: 1
  }, function(items) {

	if(items.enable_plugin)
	{
		document.getElementById('enable_plugin').checked = true;
	}
	else
	{
		document.getElementById('enable_plugin').checked = false;
	}
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('enable_plugin').addEventListener('click', save_options);

