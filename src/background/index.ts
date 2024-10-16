// Function to notify the user with two buttons and close the tab when clicking the notification
function notifyUser(url: string, tabId: number) {
  const helpUrl =
    "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/reseaux-sociaux#:~:text=Escroquerie%2C%20usurpation%20d'identit%C3%A9%2C,les%20utilisateurs%20de%20ces%20r%C3%A9seaux.";

  chrome.notifications.create({
    type: 'basic',
    iconUrl: chrome.runtime.getURL('src/assets/security.png'),
    title: 'Purifyr - Warning',
    message:
      'You are visiting a potentially harmful or dangerous site. This URL has been flagged by +10 users has suspicious.',
    contextMessage: 'Click to quit the website.', // Message updated to inform about clicking the notification to quit
    priority: 2,
    buttons: [
      { title: 'Learn more' }, // Button for help
      { title: 'Ignore warning' }, // Button to ignore
    ],
    isClickable: true,
    requireInteraction: true,
  }, (notificationId) => {
    // Listener for button clicks on the notification
    chrome.notifications.onButtonClicked.addListener((notifId, btnIndex) => {
      if (notifId === notificationId) {
        if (btnIndex === 0) {
          chrome.tabs.create({ url: helpUrl }); // Opens help URL in a new tab if "Learn more" is clicked
        } else if (btnIndex === 1) {
          console.log('User ignored the warning.');
        }
        chrome.notifications.clear(notifId); // Close the notification after a button click
      }
    });

    // Listener for clicks on the notification itself
    chrome.notifications.onClicked.addListener((notifId) => {
      if (notifId === notificationId) {
        chrome.tabs.remove(tabId); // Closes the current tab when notification is clicked
        chrome.notifications.clear(notifId); // Close the notification after click
        console.log('User quit the website by clicking the notification.');
      }
    });
  });

  console.log(`User notified about problematic URL: ${url}`);
}


// Listener for tab updates to check if the user is visiting a problematic URL
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const approvedUrls = await fetchApprovedUrls();
    // Checks if the visited URL matches any of the approved problematic URLs
    const isProblematic = approvedUrls.some((approvedUrl: string) =>
      tab.url!.includes(approvedUrl)
    );
    if (isProblematic) {
      // If the URL is problematic, send a notification and pass the tabId to handle closing the tab
      notifyUser(tab.url, tabId);
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  // Créer une entrée pour signaler du texte
  chrome.contextMenus.create({
    id: 'report-text',
    title: 'Report selected text',
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: 'report-image',
    title: 'Report this image',
    contexts: ['image'],
  });
  chrome.contextMenus.create({
    id: 'report-video',
    title: 'Report this video',
    contexts: ['video'],
  });
  chrome.contextMenus.create({
    id: 'report-html',
    title: 'Report this element',
    contexts: ['page', 'link', 'frame'],
  });
});


// Function to fetch the list of approved problematic URLs from the API
async function fetchApprovedUrls(): Promise<string[]> {
  try {
    const response = await fetch('http://localhost:3000/v1/reports/approved-urls');
    const data = await response.json();
    return data.approvedUrls;
  } catch (error) {
    console.error('Failed to fetch approved URLs from API:', error);
    return [];
  }
}

// Global error handling
self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  );
};

export { };
