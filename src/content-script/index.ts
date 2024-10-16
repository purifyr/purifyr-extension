// Function to activate the element selection mode
function activateElementSelector() {
  let selectedElement = null;

  // Add event listeners for mouseover and click events
  document.addEventListener('mouseover', highlightElement);
  document.addEventListener('click', selectElement, { capture: true });

  // Function to highlight the hovered element
  function highlightElement(event) {
    const element = event.target;
    if (selectedElement) {
      selectedElement.style.outline = '';
    }
    selectedElement = element;
    selectedElement.style.outline = '3px dashed #ff0000';
  }

  // Function to select an element on click
  function selectElement(event) {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target;
    const selector = getUniqueSelector(element);

    reportElement(selector);
    deactivateElementSelector();
  }

  // Function to get a unique CSS selector for an element
  function getUniqueSelector(element) {
    const path = [];
    let currentElement = element;

    while (currentElement) {
      let selector = currentElement.nodeName.toLowerCase();
      if (currentElement.id) {
        selector += `#${currentElement.id}`;
        path.unshift(selector);
        break;
      } else {
        let sibling = currentElement;
        let nth = 1;
        while ((sibling = sibling.previousElementSibling)) {
          if (sibling.nodeName.toLowerCase() === selector) nth++;
        }
        selector += `:nth-of-type(${nth})`;
      }
      path.unshift(selector);
      currentElement = currentElement.parentElement;
    }

    return path.join(' > ');
  }

  // Function to send the selected element to the backend and add it to the list of hidden elements
  function reportElement(selector) {
    const reportData = {
      url: window.location.href,
      type: 'html',
      content: selector,
    };

    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    })
      .then((response) => response.json())
      .then((data) => {
        hideElement(selector);
        saveReportedElement(selector);
      })
      .catch((error) => {
        console.error('Failed to report the element. Selector: ' + selector);
      });
  }

  // Function to deactivate the element selection mode
  function deactivateElementSelector() {
    document.removeEventListener('mouseover', highlightElement);
    document.removeEventListener('click', selectElement, { capture: true });
    if (selectedElement) {
      selectedElement.style.outline = ''; // Remove the highlight
    }
  }
}

// Function to hide an element based on the selector
// Function to hide an element based on the selector
function hideElement(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    // Create a replacement container with the message and button
    const placeholder = document.createElement('div');
    placeholder.style.display = 'flex';
    placeholder.style.flexDirection = 'column'; // Arrange text and button vertically
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.backgroundColor = '#f9f9f9';
    placeholder.style.padding = '10px';
    placeholder.style.border = '1px solid #ccc';
    placeholder.style.borderRadius = '5px';
    placeholder.style.color = '#333';
    placeholder.style.fontSize = '16px';
    placeholder.style.fontWeight = 'bold';

    // Main message
    const message = document.createElement('span');
    message.innerHTML = '🔒 Content blocked by Purifyr extension.';

    // Subtitle with more explicit information
    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'This content has been flagged by 10+ users as fake.';
    subtitle.style.fontSize = '12px';
    subtitle.style.margin = '0px';
    subtitle.style.color = '#666';

    // "Show" button to reveal the blocked content
    const showButton = document.createElement('button');
    showButton.textContent = 'Show';
    showButton.style.backgroundColor = '#6f8ba7';
    showButton.style.color = 'white';
    showButton.style.border = 'none';
    showButton.style.padding = '5px 10px';
    subtitle.style.marginTop = '2px';
    subtitle.style.marginBottom = '4px';
    showButton.style.borderRadius = '5px';
    showButton.style.cursor = 'pointer';

    // Add event listener to show the hidden content when button is clicked
    showButton.addEventListener('click', () => {
      placeholder.replaceWith(el); // Replace the placeholder with the original element
      el.style.display = ''; // Display the original element
    });

    // Hide the original element
    el.style.display = 'none';

    // Append the message, subtitle, and button to the placeholder
    placeholder.appendChild(message);
    placeholder.appendChild(subtitle); // Add the more explicit subtitle
    placeholder.appendChild(showButton);

    // Replace the original element with the placeholder
    el.replaceWith(placeholder);
  });
}

// Function to save the reported element in `chrome.storage`
function saveReportedElement(sel) {
  const reportData = {
    url: window.location.href,
    selector: sel,
    type: 'html',
  };

  // Envoi des données à l'API pour sauvegarder l'élément bloqué
  fetch('https://api.example.com/reports/blocked-elements', { // Remplace par l'URL de ton API
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reportData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to save reported element');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Element successfully reported and saved:', data);
    })
    .catch((error) => {
      console.error('Error saving reported element:', error);
    });
}

// Function to restore and hide all reported elements
function hideReportedElementsOnPageLoad() {
  const currentUrl = window.location.href;

  fetch(`https://api.example.com/reports/blocked-elements?url=${encodeURIComponent(currentUrl)}`, { // Remplace par ton API
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const blockedElements = data.blockedElements || [];
      blockedElements.forEach((element) => {
        hideElement(element.selector);
      });
    })
    .catch((error) => {
      console.error('Failed to retrieve blocked elements:', error);
    });
}

// Listen for messages from the background to activate the element selection mode
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'activateElementSelector') {
    activateElementSelector();
  }
});

// Hide reported elements when the page loads
document.addEventListener('DOMContentLoaded', hideReportedElementsOnPageLoad);

// Global error handler
self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  );
};
