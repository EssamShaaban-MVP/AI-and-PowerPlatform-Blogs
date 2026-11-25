---
title: "Power Apps PDF Function: A Step-by-Step Guide"
description: "In this post, I'll walk you through how I used the PDF function to send a certificate as an email attachment from Power Apps only. I'll share the steps I took and some handy…"
date: 2025-03-08
category: "Power Apps"
tags: ["Power Apps","PDF","Power Fx"]
readingMinutes: 4
cover: "/blog-images/power-apps-pdf-function-step-by-step/01.webp"
---

## The PDF function lets you create a PDF document from a screen or specific controls in your app. Imagine being able to generate certificates, invoices, or reports on the fly and send them directly via email or integrate them into a Power Automate flow. Sounds awesome, right?

In this post, I'll walk you through how I used the PDF function to send a certificate as an email attachment from Power Apps only. I'll share the steps I took and some handy tips along the way. Let's dive in!

#### Step 1: Enable the PDF Function

1. Open your app in Power Apps Studio.
2. Navigate to **Settings**.
3. Go to **Updates**: Under the **Experimental tab**, find the **PDF function** and toggle it on.

The PDF function is off by default, so the first thing you need to do is enable it:

![Figure 1: Step 1: Enable the PDF Function](/blog-images/power-apps-pdf-function-step-by-step/01.webp)

#### 2. Set Up Your Data Source

I wanted to personalize the certificates, so I built a simple table (or you can use a gallery) to act as a database. In my case, I created a collection "colTrainingData" with three fields:

- **Trainee**
- **Trainer**
- **Reviewer**

This way, I could dynamically insert these values into the certificate.

I used the below Power FX formula to generate the collection in the OnStart property of the app (You can use your own data source):
ClearCollect(colTrainingData, {Trainee: "Esam Shaaban" , Trainer: "Andrew", Reviewer: "Mike"}, {Trainee: "John" , Trainer: "Tony", Reviewer: "evins"})

![Figure 2: 2. Set Up Your Data Source](/blog-images/power-apps-pdf-function-step-by-step/02.webp)

#### 3. Design Your Certificate Layout

Now comes the fun part - designing the certificate!

- **Add a Container**: Insert a container control to hold all the elements of your certificate. Think of it as the canvas for your design.
- **Set Background Image**: I used a certificate template image as the background of the container. This makes the certificate look professional without too much effort. Make sure that the image is part of the main container.

    *Tip:* Make sure your image is high-resolution to ensure the PDF looks crisp. I used Canva to get the certificate template.

Background image position should be as follows:

- **X** = 0
- **Y** = 0
- **Width** \= Parent.Width
- **Hight** \= Parent.Hight

![Figure 3: 3. Design Your Certificate Layout](/blog-images/power-apps-pdf-function-step-by-step/03.webp)

#### 4. Add Dynamic Text Controls

Inside the container:

- **Insert Text Labels**: Add text controls for the trainee, trainer, and reviewer names.
- **Set Text Properties**: For each text control, set the **Text** property to pull data from your table. For example:

tblTraining.Selected.Trainee

This ensures that when you select a record, the certificate updates with the correct names.

![Figure 4: 4. Add Dynamic Text Controls](/blog-images/power-apps-pdf-function-step-by-step/04.webp)

#### 5. Create the Send Certificate Button

Let's make this interactive!

- Insert a button and label it "Send Certificate".
- Set the **OnSelect** property of the button with the following function:

![Figure 5: 5. Create the Send Certificate Button](/blog-images/power-apps-pdf-function-step-by-step/05.webp)

Set(

    varLoading,

    true

);

Set(

    varPDF,

    PDF(

        conCertificate,

        {

            Orientation: PaperOrientation.Landscape,

            Size: PaperSize.A4,

            Margin: "60px",

            ExpandContainers: true,

            DPI: 96

        }

    )

);

Office365Outlook.SendEmailV2(

    User().Email,

    "Thank You for Completing Your Training",

    "Hello " & tblTraining.Selected.Trainee & ", Thank you for completing Power Apps training and please find your certificate attached.",

    {

        Attachments: Table(

            {

                Name: tblTraining.Selected.Trainee & " Certificate.pdf",

                ContentBytes: varPDF

            }

        )

    }

);

Set(

    varLoading,

    false

);

Notify(

    "Certificate sent successfully!",

    NotificationType.Success

);

#### Power FX explanation

- **Start Loading:** varLoading variable used to show a loading spinner image while processing.
- **Generate PDF:** A PDF is created from a certificate design control (`conCertificate`) with specific layout settings:
  - **Orientation**: PaperOrientation.Landscape creates a horizontal layout.
  - **Size**: PaperSize.A4 sets the document to A4 size.
  - **Margin**: "60px" defines a 60-pixel margin around the content.
  - **ExpandContainers**: true / ensures that the certificate container control will be fully expanding to display all content.
  - **DPI**: 96 / sets the document’s resolution.
- **Send Email:** The PDF is attached to an email and sent to the user, with the email body.
- **End Loading:** The loading variable is reset once the email is sent.
- **User Feedback:** A notification message is shown to inform the user that the process was successful.

Add image control to the screen. Change the image position to cover the whale screen and set the visible property to **varLoading**.

![Figure 6: Power FX explanation](/blog-images/power-apps-pdf-function-step-by-step/06.webp)

### Current limitations

- Certain controls aren't currently supported. These include charts, Power BI tile, Map, and some configurations of third-party PCF controls.
- Nested Galleries aren't supported.
- Non-Latin script types and font weights and styles such as bold and italic may not appear in the generated PDF for some fonts.
- Creation of fillable PDFs isn't supported.
