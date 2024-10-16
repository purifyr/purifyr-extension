// Listener to monitor tab updates and check if the user visits a problematic URL
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Fetch the list of approved problematic URLs from an API
    const approvedUrls = await fetchApprovedUrls();

    // Check if the current URL is in the list of problematic URLs
    const isProblematic = approvedUrls.some((approvedUrl: string) =>
      tab.url!.includes(approvedUrl)
    );

    if (isProblematic) {
      // Notify the user if the URL is identified as problematic and pass the tabId to handle the tab closure
      notifyUser(tab.url, tabId);
    }
  }
});

// Add context menu options for reporting different types of content upon extension installation
chrome.runtime.onInstalled.addListener(() => {
  // Add context menu for reporting selected text
  chrome.contextMenus.create({
    id: 'report-text',
    title: 'Report a text',
    contexts: ['selection'],
  });

  // Add context menu for reporting images
  chrome.contextMenus.create({
    id: 'report-image',
    title: 'Report an image',
    contexts: ['image'],
  });

  // Add context menu for reporting videos
  chrome.contextMenus.create({
    id: 'report-video',
    title: 'Report a video',
    contexts: ['video'],
  });

  // Add context menu for reporting other HTML elements such as pages, links, or frames
  chrome.contextMenus.create({
    id: 'report-html',
    title: 'Report an element',
    contexts: ['page'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'report-html') {
    chrome.tabs.sendMessage(tab.id!, { action: 'activateElementSelector' });
  }
});

// Function to notify the user with a notification and two buttons: "Learn more" and "Ignore warning"
// If the notification itself is clicked, it will close the current tab
function notifyUser(url: string, tabId: number) {
  // URL for additional information regarding cyber security
  const helpUrl =
    "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/reseaux-sociaux#:~:text=Escroquerie%2C%20usurpation%20d'identit%C3%A9%2C,les%20utilisateurs%20de%20ces%20r%C3%A9seaux.";

  // Create a notification with a warning message
  chrome.notifications.create({
    type: 'basic',
    iconUrl: chrome.runtime.getURL('src/assets/security.png'),
    title: 'Purifyr - Warning',
    message:
      'You are visiting a potentially harmful or dangerous site. This URL has been flagged by more than 10 users as suspicious.',
    contextMessage: 'Click to quit the website.', // Inform the user that they can click the notification to quit
    priority: 2,
    buttons: [
      { title: 'Learn more' }, // Button for users to learn more about the risk
      { title: 'Ignore warning' }, // Button for users to ignore the warning
    ],
    isClickable: true, // Make the notification clickable
    requireInteraction: true, // Ensure the notification stays visible until the user interacts with it
  }, (notificationId) => {
    // Add listener for button clicks on the notification
    chrome.notifications.onButtonClicked.addListener((notifId, btnIndex) => {
      if (notifId === notificationId) {
        if (btnIndex === 0) {
          // Open help URL in a new tab if the user clicks "Learn more"
          chrome.tabs.create({ url: helpUrl });
        } else if (btnIndex === 1) {
          // Log if the user ignores the warning
          console.log('User ignored the warning.');
        }
        // Clear the notification after interaction
        chrome.notifications.clear(notifId);
      }
    });

    // Add listener for clicking the notification itself
    chrome.notifications.onClicked.addListener((notifId) => {
      if (notifId === notificationId) {
        // Close the current tab if the user clicks the notification
        chrome.tabs.remove(tabId);
        // Clear the notification
        chrome.notifications.clear(notifId);
        console.log('User quit the website by clicking the notification.');
      }
    });
  });

  console.log(`User notified about problematic URL: ${url}`);
}

// Function to fetch the list of approved problematic URLs from an external API
async function fetchApprovedUrls(): Promise<string[]> {
  try {
    // Fetch data from the API
    const response = await fetch('http://localhost:3000/v1/reports/approved-urls');
    const data = await response.json();

    // Return the list of approved URLs
    return data.approvedUrls;
  } catch (error) {
    // Log the error and return an empty array in case of failure
    console.error('Failed to fetch approved URLs from API:', error);
    return [];
  }
}

// Global error handling function to capture and log errors occurring in the extension
self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  );
};

export { };
