---
title: "Use the text generation model in Power Apps"
description: "Text generation is powered by Azure OpenAI Service, which is built on Generative Pre-trained Transformer (GPT) technology. GPT models are a type of natural language…"
date: 2023-12-19
category: "AI & Copilot"
tags: ["Power Apps","AI Builder"]
readingMinutes: 3
cover: "/blog-images/use-text-generation-model-in-power-apps/01.webp"
---

Text generation is powered by Azure OpenAI Service, which is built on Generative Pre-trained Transformer (GPT) technology. GPT models are a type of natural language processing model. GPT models are trained on a large body of content to generate human-like text from a prompt. Use them in your apps to interactively fill in forms or questionnaires, generate reports and summaries from a dataset, create automated chatbot conversations, and more. GPT models are especially helpful in generating responses for customer service teams that need to quickly reply to customer inquiries.

## Add an AI model as a data source.

The following example creates a simple app that answers a question entered in a text box.

1. Sign in to [Power Apps](https://make.powerapps.com/).
2. On the left navigation pane, select Apps.
3. On the menu at the top, select \+ New app > Canvas.
4. Enter a name for the app and choose between Tablet and Phone for the format of the app.
5. Select Create.
6. On the list of icons to the left of the Tree view, select Data > Add data > AI models.

![Figure 1: Add an AI model as a data source.](/blog-images/use-text-generation-model-in-power-apps/01.webp)

  7. Select one or more models to add.

If you don’t see your model in the list, you might not have permission to use it in Power Apps. Contact your administrator to resolve this problem.

## Bind the model prediction to a control.

Next, bind the model prediction with a control or an event to trigger the model response. The screenshot in this section shows a simple application to answer any question specified in the instruction text box.

To bind the Create text with GPT model to a control, identify an event of the control that you want to invoke the model prediction. In this case, we're binding the model to the Generate Text button and the OnSelect event on the button. The result is that whenever the button is selected, the OnSelect event is triggered, which triggers the Power Fx function mentioned here.

1. On the list of icons to the left, select Tree view.
2. Above the Tree view heading, select OnSelect in the dropdown menu.
3. On the Screens tab, select GenerateText.
4. Notice the Power Fx function:

Set(TextCompletionResult, 'Create text with GPT'.Predict(TextInput1.Text));

![Figure 2: Bind the model prediction to a control.](/blog-images/use-text-generation-model-in-power-apps/02.webp)

Congratulations! You've created an app that uses an AI Builder Create text with GPT capability. On the top of the screen, select Save to save all the changes in the app, and then select Play to test the application.

[](https://learn.microsoft.com/en-us/ai-builder/azure-openai-model-papp#parameters)

## Parameters

For a list of the parameters used in Azure OpenAI Service, go to [input parameters](https://learn.microsoft.com/en-us/ai-builder/azure-openai-model-pauto#input-parameters) and [output parameters](https://learn.microsoft.com/en-us/ai-builder/azure-openai-model-pauto#output-parameters) in Power Automate.

\---------------------------------------------------------------------------------------

### This is a fully & quick step-by-step guide for the provided scenario

Make sure that you added "Create text with GPT" connector and then follow the below steps.

### Step 1: Integrating User Input

I added a Text Input control "TextInput1" at the top of the page. You can use it to ask your questions.

### Step 2: Initiating the GPT

Utilizing a chatbot icon by adding the following function in the OnStart property to store the GPT output on the TextCompletionResult variable:

Set(TextCompletionResult, 'Create text with GPT'.Predict(TextInput1.Text));

You can add another variable in the above FX formula to visible a loading page and a timer control to hide it after seconds if you will be happy to do that.

### Step 3: Displaying Variable Content

For displaying the GPT output from the variable, I employed a Text Label using the below function in the Text property.

TextCompletionResults.Text

### Step 4: Resetting the Page

I implemented a feature to reset the page when needed. This is achieved through the following functions:

Reset(TextInput1); Set(TextCompletionResults, Blank());

By incorporating these functions, users can efficiently clear their input and receive a fresh slate for further interactions.

![Figure 3: Step 4: Resetting the Page](/blog-images/use-text-generation-model-in-power-apps/03.webp)

In conclusion, the integration of text completion in Microsoft Power Platform opens up exciting possibilities for creating dynamic and user-centric applications. Leveraging these steps, developers can enhance the overall user experience and foster more intuitive interactions within their Power Platform applications. Stay tuned for more insights and innovations in the world of Power Platform development!
