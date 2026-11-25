---
title: "AI features in Power Apps"
description: "Bringing the power of AI Copilot to both app makers and their end-users in Power Apps. With Copilot you can build an app, including the data behind it, just by describing…"
date: 2023-12-17
category: "AI & Copilot"
tags: ["Power Apps","AI Builder","Copilot"]
readingMinutes: 14
cover: "/blog-images/ai-features-in-power-apps-bringing/01.webp"
---

**

![Figure 1: AI features in Power Apps](/blog-images/ai-features-in-power-apps-bringing/01.webp)

**

Bringing the power of AI Copilot to both app makers and their end-users in Power Apps. With Copilot you can build an app, including the data behind it, just by describing what you need through multiple steps of conversation. Your apps will have copilot-powered experiences built in from the first screen—so your users can discover insights in conversation instead of mouse-clicks.

To learn how to use the new AI features in Power Apps:

1- Build apps through conversation.

2- Continue editing your app with Copilot.

3- Add Chatbot control to a canvas app.

4- Add Copilot control to a canvas app.

5- Add copilot for app users in model-driven apps.

6- Leverage Azure OpenAI Service in AI Builder.

#### 1- Build apps through conversation

Create Power Apps with the help of AI. Describe the app that you want to build, and AI will design it for you.

With the Copilot feature in Power Apps, you get in-app guidance using natural language processing to help you build your app.

The AI assistant is available from the Power Apps home screen. You can tell the AI assistant what kind of information you want to collect, track, or show and the assistant will generate a Dataverse table and use it to build your canvas app.

![Figure 2: 1- Build apps through conversation](/blog-images/ai-features-in-power-apps-bringing/02.webp)

#### Step 1: Create an app with the help of AI

To help you get started, let's build an app to track housekeeping tasks for a hotel.

1. Sign in to [Power Apps](https://make.powerapps.com/).
2. In the text box, enter hotel housekeeping.
3. A Dataverse table with data that includes typical hotel housekeeping tasks is created for you.

![Figure 3: Step 1: Create an app with the help of AI](/blog-images/ai-features-in-power-apps-bringing/03.webp)

### Step 2: Review the table for your app

Based on what you described, AI generates a table for your app. You can take the following actions:

1. Suggestions: These are suggested actions that you can ask the AI assistant to take to help you finalize the table.
2. View column: Select to view the column name.
3. Edit table name: View the table name and its properties.
4. Copilot: Enter text to instruct the AI assistant on how to modify the table, such as remove room type column.
5. Create app: Select Create app to create an app based on the table or select Cancel to start over.

![Figure 4: Step 2: Review the table for your app](/blog-images/ai-features-in-power-apps-bringing/04.webp)

### Step 3: Make edits

If you want to make changes, use the Copilot panel to describe what you want to do, and it will make the change for you. Let's ask Copilot to add a column to track cleaning start and end time.

1. In the Copilot text box enter, Add columns to track start and end time.
2. Copilot has added two new columns called, Start Time and End Time.
3. You can continue editing the table by adding features such as room status, change rooms, or set priority levels for each room. When you're ready to create your app, select Create app.

\------------------------------------------------------------------------------

## 2- Continue editing your app with Copilot.

Build and continue editing your app with the help of Copilot powered by AI. Tell Copilot what changes you want to make to your app in simple language, and let AI do the work for you.

The Copilot panel is available when you edit a canvas app in Power Apps Studio. You can edit your app by telling Copilot what kind of changes you want to make such as add a screen, configure navigation, styling a single control, or bulk editing.

![Figure 5: 2- Continue editing your app with Copilot.](/blog-images/ai-features-in-power-apps-bringing/05.webp)

**What's** **supported.**

AI Copilot supports the following commands:

- Use a screen template to add a new screen.
- Modify the properties of various controls. Supported controls:
- Screen
- Horizontal and Vertical containers
- Gallery
- Edit form
- Button
- Text label
- Text input

 Note: Modern controls are not supported.

### Use Copilot to edit your app

1. Sign in to [Power Apps](https://make.powerapps.com/) and open a canvas app for editing.
2. In Power Apps Studio, on the top right, select Copilot.
3. In the Copilot panel, chat with Copilot and describe the changes you want to make such as Add a new screen.

![Figure 6: Use Copilot to edit your app](/blog-images/ai-features-in-power-apps-bringing/06.webp)

\----------------------------------------------------------------------------------

#### 3- Add Chatbot control to a canvas app.

Add Chatbot control to your canvas apps and embed a published [Copilot Studio](https://web.powerva.microsoft.com/) chatbot to assist your end-users with a variety of requests—from providing simple answers to common questions to resolving issues requiring complex conversations.

The Chabot control is also available in [custom pages for model-driven apps](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/model-app-page-overview). The control also supports authenticated Copilot Studio bots. A bot picker lists all bots that are in the same environment as your app.

You can use an AI bot or AI boosted conversations bot:

- With AI chatbots, you can create an extended tree of answers to support your users. More information: [Power Virtual Agents quickstart](https://learn.microsoft.com/en-us/power-virtual-agents/quickstart-preview)
- With AI boosted conversations Copilot Studio bot your bot can have a higher ability to respond to the user by using a number of prompts or generating a response based on provided "fallback" website, which you set. The "fallback" website can include internal documents or publicly available websites. More information: [AI-based boosted conversations overview (preview)](https://learn.microsoft.com/en-us/power-virtual-agents/nlu-gpt-overview)

You can design the Chabot control by giving it a name, change the size of the control window, and position it anywhere on the screen.

![Figure 7: 3- Add Chatbot control to a canvas app.](/blog-images/ai-features-in-power-apps-bringing/07.webp)

### Prerequisites

Follow the prerequisites for AI features: [AI Copilot overview (preview)](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/ai-overview)

- To add the Chatbot control, you need to create and publish a bot on the [Copilot Studio web app](https://learn.microsoft.com/en-us/power-virtual-agents/fundamentals-what-is-power-virtual-agents-portal). You can create any bot such as an AI bot or a new generative AI enriched Power Virtual Agents bot.
- You can see all your Copilot bots (published and unpublished) in the list of Chatbot control when you pick the bot to connect to. However, you can only add a published bot to the control. Unpublished bots are grayed out.

[](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-ai-chatbot#add-a-control-with-a-bot)

### Add a control with a bot

With your [canvas app open for editing](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/edit-app):

1. On the app authoring menu, select Insert.
2. Expand the Input menu and then select Chatbot (preview)). Place the Chatbot control where you want to add it on the screen.

![Figure 8: Add a control with a bot](/blog-images/ai-features-in-power-apps-bringing/08.webp)

> 3. Choose the bot you want to connect from one of your published Copilot Studio bots or select New Copilot to create a new one.

> You can change the name, the position, and size of the control.

[](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-ai-chatbot#key-properties)

#### Key properties

The following are the main properties for Chatbot control:

- Header label: This is the name of the bot that your end-user sees. If you don't enter a header label, then the name is Chatbot.
- Schema name: This property refers to the Copilot Studio bot that you connect to. The property automatically populates once a bot is selected. To choose a bot, for Schema name property select, Select bot.
- Visible: Choose if you want the bot be visible or not.
- Position and Size: Determines how your bot looks on the screen. Use the other properties or move the control on the screen to set position and size of the control on the screen.

    Once you select the bot and set the properties, the properties pane looks like this:

![Figure 9: Key properties](/blog-images/ai-features-in-power-apps-bringing/09.webp)

### Limitations

1. Chatbot control isn't supported on the Power Apps mobile app.
2. Chatbot control isn't available in [Power Apps US Government](https://learn.microsoft.com/en-us/power-platform/admin/powerapps-us-government) or Mooncake.

\----------------------------------------------------------------------

## 4- Add Copilot control to a canvas app.

The Copilot control is a next-generation AI assistant that makers can add to their canvas apps for end-users. This is an AI-powered experience for app users to get insights about the data in their apps through conversation in natural language. Makers can add this control to any canvas app and choose what data it can answer questions about.

### Step 1 - Enable Copilot for your environment

In order for end users to use the Copilot chat experience in a canvas app, an admin must first turn on the feature, Allow users to analyze data using an AI-powered chat experience in canvas and model-driven apps (preview) in their [environment](https://admin.powerplatform.microsoft.com/). For more information, see [Manage feature settings](https://learn.microsoft.com/en-us/power-platform/admin/settings-features#copilot-preview).

![Figure 10: Step 1 - Enable Copilot for your environment](/blog-images/ai-features-in-power-apps-bringing/10.webp)

When the feature setting is turned on, a maker can then enable Copilot component from the app settings in Power Apps Studio and then add the Copilot control to the app, allowing end users to use the AI-powered chat experience.

### Step 2 - Enable Copilot component for a canvas app

Open your [canvas app open for editing](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/edit-app) in Power Apps Studio:

1. On the command bar, select Settings > Upcoming features.
2. From the Preview tab, set the toggle for Copilot component to On.

![Figure 11: Step 2 - Enable Copilot component for a canvas app](/blog-images/ai-features-in-power-apps-bringing/11.webp)

### Step 3 - Add Copilot control to your canvas app

Add the Copilot (preview) control to your canvas app enabling end users to gain insights about the data in their apps through the chat experience.

With your [canvas app open for editing](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/edit-app) in Power Apps Studio:

1. On the app authoring menu, select Insert and select Copilot (preview) to add this control.

![Figure 12: Step 3 - Add Copilot control to your canvas app](/blog-images/ai-features-in-power-apps-bringing/12.webp)

#### Choose data for Copilot

1. When the Copilot control is added to the canvas app, select a data source from the pane. Copilot can only provide data insights on a single Dataverse table when an end user asks a question.

![Figure 13: Choose data for Copilot](/blog-images/ai-features-in-power-apps-bringing/13.webp)

Or, from the control Properties tab, select Data source (Items) and choose a Dataverse table for your data source.

2\. Select the specific Fields and/or View that the Copilot control answers questions for.

3.To configure the selected table and its columns for use in Copilot, see [Configure tables to use Copilot](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/table-settings-for-copilot).

Note

Copilot can only answer questions for smaller datasets in a canvas app. The only exception to the dataset limit is when a Dataverse table is selected as the data source.

### Provide feedback

App users and makers can provide feedback by selecting Like (thumbs up) or Dislike (thumbs down) button for each response that Copilot provides. Optionally, app users can also enter additional feedback in the text box and then select Submit.

[](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-ai-copilot#disable-feedback-for-app-users)

#### Disable feedback for app users

Admins can disable the option for apps users to provide feedback to Microsoft from the Copilot chat experience.

1. Sign in to [Power Apps](https://make.powerapps.com/).
2. On the [left navigation pane](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/intro-maker-portal#1--left-navigation-pane), select Tables > Organization.
3. In the Organization columns and data section, select the list of columns and search for Allow users to provide feedback for App Copilot.
4. Set the toggle to No.

\----------------------------------------------------------------------

## 5- Add copilot for app users in model-driven apps.

Copilot for model-driven apps in Power Apps is a next-generation AI assistant for app users to get insights about the data in their apps through conversation in natural language. Copilot helps app users boost their productivity through AI-powered insights and intuitive app navigation.

When enabled, copilot can be accessed through the copilot icon in the right navigation bar in a model-driven app. The copilot pane can be opened or minimized as desired.

![Figure 14: 5- Add copilot for app users in model-driven apps.](/blog-images/ai-features-in-power-apps-bringing/14.webp)

Copilot in model-driven apps can answer questions about the configured Microsoft Dataverse table data in the environment. Copilot can also help you navigate the model-driven app. For example, when a user enters *take me to Online Cases* or *show me Cruise Support Tickets*, the copilot in the model-driven app automatically opens the relevant app screens.

[](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/add-ai-copilot#enable-copilot-for-model-driven-apps-feature-for-your-environment)

### Enable copilot for model-driven apps feature for your environment

Power Platform administrators enable the copilot feature in model-driven apps for all the users in their environments from the [Power Platform admin center](https://admin.powerplatform.microsoft.com/).

The copilot for app users in model-driven apps feature isn't enabled by default. Administrators must manually enable this feature for their environments in [Power Platform admin center](https://admin.powerplatform.microsoft.com/).

1. Sign in to the Power Platform admin center at [https://admin.powerplatform.microsoft.com](https://admin.powerplatform.microsoft.com/).
2. In the navigation pane, go to Environments and select the environment where you want to enable copilot for app users in model-driven apps in. Select Settings for this environment on the command bar.

![Figure 15: Enable copilot for model-driven apps feature for your environment](/blog-images/ai-features-in-power-apps-bringing/15.webp)

3.In Settings for the selected environment, select Product > Features.

![Figure 16: Enable copilot for model-driven apps feature for your environment](/blog-images/ai-features-in-power-apps-bringing/16.webp)

4. In the Features section, set the value for Allow users to analyze data using an AI-powered chat experience in canvas and model-driven apps to On, and then Save your changes.

![Figure 17: Enable copilot for model-driven apps feature for your environment](/blog-images/ai-features-in-power-apps-bringing/17.webp).png)

### Set your environment to receive monthly updates for model-driven apps

Makers must set their environment to receive monthly model-driven apps updates as a prerequisite for having copilot for end users in model-driven apps.

1. Sign in to the Power Platform admin center at [https://admin.powerplatform.microsoft.com](https://admin.powerplatform.microsoft.com/).
2. In the navigation pane, go to Environments and select the environment where you want to enable copilot for app users in model-driven apps. Select Settings on the command bar.
3. Select Product > Behavior. Set Release channel for model-driven apps to Monthly channel, and then Save your changes.

![Figure 18: Set your environment to receive monthly updates for model-driven apps](/blog-images/ai-features-in-power-apps-bringing/18.webp)

More information: [Behavior settings](https://learn.microsoft.com/en-us/power-platform/admin/settings-behavior#settings) and [Changing release channels for model-driven apps](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/channel-change).

[](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/add-ai-copilot#configure-dataverse-tables-and-columns-for-copilot)

### Configure Dataverse tables and columns for copilot

Administrators must configure the Dataverse tables that copilot will use for the responses. You must choose both the tables and the columns of importance for copilot to search across to produce relevant, high quality data insights. More information: [Configure tables to use copilot](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/table-settings-for-copilot).

 Important

Not configuring standard and custom Dataverse tables for copilot might result in poor quality of copilot insights. Configure your Dataverse tables and columns of importance to receive relevant, accurate copilot responses in model-driven apps.

 Note

Questions and answers for enterprise data environments that have [customer managed key](https://learn.microsoft.com/en-us/power-platform/admin/customer-managed-key) or [Customer Lockbox](https://learn.microsoft.com/en-us/power-platform/admin/about-lockbox) won't use your data stored in Dataverse. You might get answers from copilot, but they won't be based on your Dataverse database.

[](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/add-ai-copilot#disable-copilot-for-a-model-driven-app)

### Disable copilot for a model driven app

Makers can disable copilot for their model-driven app. In app designer, open your model-driven app for Edit, and then select Settings on the command bar. Select Upcoming on the Settings screen, and then set Copilot Control to Off. Save and Publish the model-driven app for the changes to take effect.

![Figure 19: Disable copilot for a model driven app](/blog-images/ai-features-in-power-apps-bringing/19.webp)

### Provide feedback in copilot

To provide feedback to help improve copilot, app users select the thumb up or thumb down icon included in each copilot response. Feedback can be submitted for each copilot response in the pane.

[](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/add-ai-copilot#provide-positive-feedback)

#### Provide positive feedback

1. On the right navigation bar, select the thumb up icon.
2. Optionally, provide feedback in your own words about what you liked.
3. Select Submit after you're done entering your feedback.

[](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/add-ai-copilot#provide-feedback-for-improvement)

#### Provide feedback for improvement

1. On the right navigation bar, select the thumb down icon.
2. Optionally, provide feedback, such as feedback about the content of copilot’s response, or a description in your own words about what went wrong, or how you would like copilot to improve.
3. Select Submit after you're done entering your feedback.

[](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/add-ai-copilot#disable-feedback-for-app-users)

### Disable feedback for app users

If you want to disable the ability for users to submit feedback about copilot in model-driven apps, follow these steps.

1. Sign in to [Power Apps](https://make.powerapps.com/).
2. Go to Tables, and then open the Organization table.
3. In the Organization columns and data section, select +nnn more to display the column search box.
4. In the search box, search for the *Allow users to provide feedback for App Copilot* column.

![Figure 20: Disable feedback for app users](/blog-images/ai-features-in-power-apps-bringing/20.webp)

5. Set the column to No, and then Save the table.

![Figure 21: Disable feedback for app users](/blog-images/ai-features-in-power-apps-bringing/21.webp)

\---------------------------------------------------------------------

## 6- Leverage Azure OpenAI Service in AI Builder.

Text generation model overview

The text generation model's capability is a powerful tool in AI Builder. It enables you to quickly and easily build AI-powered applications that use text generated from your input, like these tools that:

- Quickly and accurately summarize long documents and extracts key information.
- Help draft responses to user queries.
- Classify text into different categories.
- Translate text from one language to another.

Text generation is powered by Azure OpenAI Service, which is built on Generative Pre-trained Transformer (GPT) technology. These large language models have been trained on a massive amount of text data. This enables them to generate text that's similar to human written text.

### Explore the model

The text generation model has a prompt engineering interface with sample prompts you can try. You can also create your own prompts to instruct the model.

1. Sign in to [Power Apps](https://make.powerapps.com/) or [Power Automate](https://make.powerautomate.com/).
2. On the left navigation panel, select AI Builder > Explore (Power Automate) or AI models > Build an AI model (Power Apps).
3. Select Text > Text generation.

    The following screenshot is from Power Automate.

![Figure 22: Explore the model](/blog-images/ai-features-in-power-apps-bringing/22.webp)

The next window that opens is where you can create text that can be used for many tasks. [Learn how text generation works](https://learn.microsoft.com/en-us/ai-builder/azure-openai-textgen).
