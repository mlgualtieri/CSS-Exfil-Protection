// Example: https://developer.chrome.com/extensions/options


// Saves options to chrome.storage
function save_options() 
{
	var enable_plugin = 1;

  	if(!document.getElementById('enable_plugin').checked)
	{
		enable_plugin = 0;
	}
 
  	browser.storage.local.set({
  	    enable_plugin: enable_plugin
  	}, function() {});
}


// Restores select box and checkbox state using the preferences stored in chrome.storage.
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

