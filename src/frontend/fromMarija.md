# Motivation for project decisions
I used React with typescript, since it's less bug prone than plain javascript. 
For state management I used mobx, in combination with React's built it state.
I used webpack for bundling the code.
This is the first time I used material ui components, seem pretty intuitive to use.
The app is deployed at https://chatappstorage.blob.core.windows.net/chat-app/index.html .

# Follow ups
If this project was being shipped to Production I would do the following:

1. Add dependency injection via i.e. inversify
2. Optimize bundle by tweaking webpack config, move the image resource to be deployed separately .
3. Add unit tests with jest
4. Add visual regressions tests - i.e. storybook tests
5. Add automated integration test - i.e. with selenium web driver
6. Add a linter and rules that come with it i.e. eslint
7. I would add support for string localization
8. Add support for Right-To-Left design 
9. Add dark theme support - it should be simple, as material-ui already supports it.