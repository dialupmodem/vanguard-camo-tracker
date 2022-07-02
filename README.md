# vanguard-camo-tracker
## About this project
This was a learning/refresher project I mostly built for personal use. I published it here in hopes that somebody other than me would find some use out of it. It was built using Vue.js 2, Axios, and Vuex, there's a complimentary API project that facilitates data access. That can be found here: [vanguard-camo-tracker-api](https://github.com/dialupmodem/vanguard-camo-tracker-api)

It's currently built as a sinlge-user application. There's a possibility of this changing in the future, we'll see what develops.

## What it does
It's a simple utiilty for tracking weapon challenge/camo progress in Vanguard. I was frustrated with the game's inability to view weapon challenges during a match so I created this utility to help remedy that.

The application has a listing of weapons divided into their respective category (Assault Rifles, SMGs, etc.) and allows selection of a weapon to modify the current progress for each of that weapon's challenges.

## Configuration
The value of `VUE_APP_API_BASE` is used to configure the base url for API requests. It should be pointed to where the API is hosted.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
