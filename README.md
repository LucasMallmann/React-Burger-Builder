# React Burger Builder
This is a study project based on a **React Couse** to build and order a delicious hamburger !

You can visit the project in this url: https://react-my-burger-aade8.firebaseapp.com/

## Installation
Follow the following steps to download and install the project.
```
$ git clone https://github.com/LucasMallmann/React-Burger-Builder.git
$ cd React-Burger-Builder/
$ npm install
```

You can run the project by running `npm start`. The server will be listening in `localhost:3000` by default.

## Architecture
The project is divided into components, as it is the main principle of React.
### Folders
- `src/components` - Components that are reusable through the application, and are generally styled components.
- `src/containers` - Statefull components. These components don't have presentation code. They are components that manage the application state.
- `src/hoc` - [High Order Components](https://reactjs.org/docs/higher-order-components.html).
- `src/store` - [Redux](https://redux.js.org/) main store.