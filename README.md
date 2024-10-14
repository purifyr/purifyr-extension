# Purifyr - Chrome Extension 🛡️

Purifyr is a Chrome extension designed to promote awareness, prevention, and support against harmful online content. By enabling community-driven content moderation, Purifyr helps users report, block, and stay informed about potentially dangerous or inappropriate material. This extension aims to create a safer browsing environment through collective vigilance and proactive protection.

## Features

### 1. **Report Specific Content (Text, Image, Video, HTML Elements)** 📝
- Users can report specific **texts**, **images**, **videos**, or **HTML elements** on a webpage via a right-click context menu.
- Reported content is sent to the backend for moderation by administrators or for community voting.

### 2. **Report Entire URL** 🌐
- Users can report an entire **URL** if they believe that the page or website contains harmful or inappropriate content.
- The reported URL is recorded in the database for further review.

### 3. **Monitor Time Spent on Reported URLs** ⏱️
- The extension tracks how much time users spend on **reported URLs**.
- If a user spends more than **60 seconds** on a reported URL, an **awareness notification** is displayed to inform them of potential risks associated with the site.

### 4. **Awareness Notifications** ⚠️
- If a user spends too much time on a reported URL, a notification will pop up with a button to learn more about why the site was reported.
- A link is provided for **redirection to an awareness page** or an external resource explaining the risks, such as misinformation or toxic content.

### 5. **Admin Interface for Validating or Rejecting Reports** 🛠️
- Administrators have access to a web interface where they can review content reports (text, images, videos, URLs) and decide whether to **approve** or **reject** them.
- Once validated, the content is blocked for all users of the extension.

### 6. **Community Voting System** 🗳️
- Users can vote on reports submitted by other community members, helping prioritize and validate the content, giving more power to the users.
- Content or URLs may be automatically blocked if they receive a sufficient number of positive votes.

### 7. **Automatic Blocking of Validated Content** 🚫
- Once a report (either specific content or an entire URL) is validated by an administrator or through the community voting system, it is **automatically blocked** for all users of the extension.

### 8. **Custom Content Filters** ⚙️
- Users can create their own **custom filters** to block content they find inappropriate or disturbing, such as political content, violence, or intrusive ads.
- Users can adjust the sensitivity of filters to control how much content gets blocked.

### 9. **Assisted Reporting via Pharos** 🖼️
- **Screenshot of the Content**: Users can take a screenshot directly from the extension, selecting the specific part of the content they want to report (text, image, video, etc.).
- **Context Form**: A quick form allows users to provide additional details about the reported content:
  - Type of content (e.g., cyberbullying, misinformation, hate speech).
  - A brief description of the issue (e.g., "This content promotes hate," "Identity theft").
  - Optional: URL of the content.
- **Submission to Admins**: Once the screenshot and context are provided, the report is sent to administrators for review.
- **Notifications to Users**: Users receive a notification through the extension when their report has been reviewed by administrators and submitted to Pharos.

## How to Install 🖥️
1. Clone or download this repository.
2. Open Chrome and navigate to **chrome://extensions**.
3. Enable **Developer mode** in the top right corner.
4. Click on **Load unpacked** and select the folder containing the extension files.

## How to Use 💡
- Right-click on content you wish to report and select **"Report with Purifyr"**.
- Customize your content filters in the extension settings.
- Receive awareness notifications when visiting potentially harmful sites.

## Contributing 🤝
We welcome contributions from the community! Feel free to fork this repository and submit pull requests with improvements, new features, or bug fixes.

## License 📜
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact 📧
For any questions or support, feel free to contact us at contact@purifyr.app.
