Do you want to deploy your application on a server/cloud for a short period, like 2-3 days, without incurring hosting charges? GitHub Pages doesn't support backend functionalities, so having just HTML/JS on the frontend might not be sufficient.
One option is to use your own computer or Raspberry Pi as a temporary server. However, ISPs nowadays often implement CGNAT, which makes port forwarding impossible, and dynamic IPs can change frequently.
To solve this problem, I have created a small prototype project. In this project, I've developed an Express application that I can host on my own computer or Raspberry Pi. Anyone can access it globally via a static URL.
I achieved this using IPv6 and GitHub Pages. Here's how it works: I've written code to dynamically create a webpage (hosted on GitHub Pages) that redirects to the IPv6 address of my computer or Raspberry Pi. The code also monitors the public IPv6 address, automatically updating GitHub with new redirection logic whenever the IP changes.
In essence, I can host my web app with both frontend and backend components from home using a static URL. Cool, right? Check out the code on my GitHub repository.



Project Setup Information (brief):

The main project requires a directory (you can name it anything) containing a separate Git repository (for the GitHub Pages). This repository's content is dynamically created by our application.

Additionally, define the following environment variables:

PATH_TO_REDIRECT_HTML: Path to the HTML file inside the GitHub repo for the GitHub Pages.
PATH_TO_HTML_PROJECT: Path to the internal GitHub repo for the GitHub Pages.
PATH_TO_CONFIG: Path to the config file named _config.yml, located directly inside PATH_TO_HTML_PROJECT.
TARGET_BRANCH: The branch to use for the GitHub Pages.

Example:



    PATH_TO_REDIRECT_HTML = './linkDirs/wolf_links/index.html'
    PATH_TO_CONFIG = './linkDirs/wolf_links/_config.yml'
    PATH_TO_HTML_PROJECT = './linkDirs/wolf_links/'
    TARGET_BRANCH = 'main'
