---
title: "Configuration and Development of Multilingual Chatbots (Copilot)"
description: "Multilingual bots (Copilot) are chatbots that can communicate with customers in different languages while keeping all the content in a single bot. In many cases, they can…"
date: 2023-11-19
category: "AI & Copilot"
tags: ["Copilot","Chatbots"]
readingMinutes: 3
cover: "/blog-images/configuration-and-development-of/01.webp"
---

This feature is still in preview.

Multilingual bots (Copilot) are chatbots that can communicate with customers in different languages while keeping all the content in a single bot. In many cases, they can automatically detect the desired language and respond in the same language, providing a more personalized and engaging experience for customers.

For the list of supported languages, see our [Supported Languages article](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-language-support).

## Configuring a multilingual bot (Copilot)

When a bot is initially created, it's created with a primary language. (See the [Supported Languages article](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-language-support) for more details on how to select the bot's primary language).

To enable a multilingual bot:

1. With a bot open, expand Languages (Preview) on the side navigation pane, and select Add languages.

![Figure 1: Configuring a multilingual bot (Copilot)](/blog-images/configuration-and-development-of/01.webp)

2\. Choose the languages you want to add to the bot.

![Figure 2: Configuring a multilingual bot (Copilot)](/blog-images/configuration-and-development-of/02.webp)

3\. Select Add Languages and confirm that the list of languages is correct.

![Figure 3: Configuring a multilingual bot (Copilot)](/blog-images/configuration-and-development-of/03.webp)

## Managing localization in a multilingual bot

To add the localization strings to your multilingual bot:

1. With a bot open, expand Languages (Preview) on the side navigation pane, and select Update localizations for the language you want to update.
2. On the Update localizations page, select JSON or ResX format to download the current localization file for that language.

![Figure 4: Managing localization in a multilingual bot](/blog-images/configuration-and-development-of/04.webp)

      3. Open the downloaded file and replace the primary language strings with the appropriate translated text.
      4. Return to the Update localizations page, select Browse, and upload the translated file.
      5. Close the Update localizations page.

## Authoring considerations for multilingual bots

When authoring, you can configure the bot to change the current spoken language in the middle of a conversation. That logic can reside in any topic in the bot.

To change the bot's current language, you can set the `User.Language` variable value to one of your bot's secondary languages. This selection changes the language spoken by your bot immediately.

![Figure 5: Authoring considerations for multilingual bots](/blog-images/configuration-and-development-of/05.webp)

## Testing a multilingual bot

To test a multilingual bot:

1. Open the test bot.
2. Open the menu at the top of the test bot, and select one of the secondary languages.

![Figure 6: Testing a multilingual bot](/blog-images/configuration-and-development-of/06.webp)

     3. The test bot will reload itself, this time using the selected secondary language. The authoring canvas shows the secondary language.
     3. Enter a message in the secondary language to test the bot.

You can also set your browser language to the secondary language supported by your bot, and open the [Demo bot website](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-connect-bot-to-web-channels?tabs=preview#customize-the-demo-website). The demo website opens in the secondary language, and the bot chats using the secondary language strings.

## Multilingual bot behavior for languages that are not configured

If a bot user has their browser configured for a language that is not configured in the bot through the steps above, the bot will always fallback to its primary language (the language the bot was created in originally). The bot's primary language cannot be changed after bot creation.

[](https://learn.microsoft.com/en-us/microsoft-copilot-studio/multilingual#multilingual-bot-behavior-for-missing-translations)

## Multilingual bot behavior for missing translations

If the bot author makes a change to the bot in the primary language and doesn't [upload the translations](https://learn.microsoft.com/en-us/microsoft-copilot-studio/multilingual#managing-localization-in-a-multilingual-bot), the bot will show the untranslated changes in the bot's primary language. This leads to a confusing dual-language experience. Always make sure the translations are up-to-date after making changes to the bot in the primary language.
