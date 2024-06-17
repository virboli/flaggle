<img src="https://github.com/khui0/flaggle/assets/101839505/74edb39b-2f66-4a2e-a203-722aeed80353" height=128>

# Flaggle

Play here: [kennyhui.dev/flaggle](https://kennyhui.dev/flaggle/)

A flag guessing game inspired by Wordle. Currently includes 255 country flags and three game modes!

## How to play

You can choose the game mode by clicking on it in the top right corner or by using the hamburger menu on mobile.

### Classic

Your goal is to guess the target flag, similar to guessing the target word in Wordle. Start by picking a country to guess. Once you make your guess, you will be given an image that shows the similarity between the flag you guessed and the target.

<img width="783" alt="image" src="https://github.com/khui0/flaggle/assets/101839505/405f8fa9-84c1-404f-a02f-fadd559f5f00">

In this example, I chose Seychelles. From the image on the right, I can infer that the target flag has a red horizontal stripe on the top, with a white horizontal stripe in the middle, with a star in the middle. This information can be used to make the next guess.

You can make as many guesses as you'd like, though using less guesses _is_ more impressive...

Lastly, try to maintain a streak by not giving up! The streak counter is shown in the top left corner once you gain a streak.

<img width="87" alt="image" src="https://github.com/khui0/flaggle/assets/101839505/84639369-1c32-44e1-8f66-8e2cf37dca81">

### Lightning

This mode is faster paced than **Classic**. The target flag is shown to you and you have six attempts to guess it. Lightning mode has its own separate streaks, which end once you are unable to guess a flag or give up.

<img width="802" alt="image" src="https://github.com/khui0/flaggle/assets/101839505/78de92e6-e153-4d9d-9c00-1198ee2e64d0">

### Daily

This mode features the same gameplay as **Classic**, but there is a new target flag every day, similar to Wordle. Try to guess the flag in as few attempts as possible and challenge your friends! There's no giving up...

Streaks in this mode are counted by the past consecutive days you were able to guess the target flag.

## Stats

<img width="36" alt="image" src="https://github.com/khui0/flaggle/assets/101839505/c090f0d0-5fa5-4bc6-b0fe-12360dbea5fc">

Your statistics can be viewed by clicking the stats button in the top right corner.

<img width="529" alt="image" src="https://github.com/khui0/flaggle/assets/101839505/0d5095e1-8320-456b-8fd0-894cb3fff2cc">

## Settings

<img width="36" alt="image" src="https://github.com/khui0/flaggle/assets/101839505/aa5db1c7-1ea1-40a3-ac8c-7820ab91fe09">

Change your theme by clicking the settings button in the top right corner.

## Sources

Flag SVGs, country names, and ISO codes are obtained from [flagpedia.net](https://flagpedia.net/).

Images with a common aspect ratio (3:2) are generated using [khui0/flaggle-flag-generator](https://github.com/khui0/flaggle-flag-generator)

## Development

This app is built using Svelte and SvelteKit. Start by cloning or forking this repository.

Install dependencies

```bash
npm i
```

Start local development server

```bash
npm run dev
```

Build project; files will be built to the `dist` directory

```bash
npm run build
```
