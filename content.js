const userInfo = {
    email: "danny.c.gleason@gmail.com",
    phoneCountryCode: "United States (+1)",
    phoneNumber: "5551234567",
    resumeLabel: "DannyGleasonResume.pdf",
    csmExperienceYears: "5", 
    itsmExperienceYears: "3", 
    serviceNowExperienceYears: "4" 
};

// Maximum number of jobs to apply to
const maxApplications = 25;

async function waitForElement(selector, timeout = 30000) {
    const startTime = new Date().getTime();
    while (true) {
        const element = document.querySelector(selector);
        if (element) return element;
        const elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime > timeout) throw new Error(`Element ${selector} not found`);
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
}

async function clickEasyApplyButton() {
    const easyApplyButton = await waitForElement('button[data-job-id]', 10000);
    easyApplyButton.click();
}

async function fillAndSubmitForm() {
    await clickEasyApplyButton();
    await new Promise(r => setTimeout(r, 2000)); // Wait for modal to open

    // Fill email address
    const emailDropdown = await waitForElement('select[id^="text-entity-list-form-component-formElement"][aria-required="true"]', 5000);
    for (let i = 0; i < emailDropdown.options.length; i++) {
        if (emailDropdown.options[i].value === userInfo.email) {
            emailDropdown.value = userInfo.email;
            break;
        }
    }

    // Select phone country code
    const phoneCountryDropdown = await waitForElement('select[id^="text-entity-list-form-component-formElement"][required=""][data-test-text-entity-list-form-select=""]', 5000);
    for (let option of phoneCountryDropdown.options) {
        if (option.text.includes(userInfo.phoneCountryCode)) {
            phoneCountryDropdown.value = option.value;
            break;
        }
    }

    // Input mobile phone number
    const phoneNumberInput = await waitForElement('input[id^="single-line-text-form-component-formElement"][type="text"]', 5000);
    phoneNumberInput.value = userInfo.phoneNumber;

    // Click the Next button to move to resume upload step
    const nextButton = await waitForElement('button[data-easy-apply-next-button]', 5000);
    nextButton.click();

    // Wait for the resume upload section to load and select the resume
    await new Promise(r => setTimeout(r, 2000)); // Adjust timing as necessary
    selectResume();
}

async function selectResume() {
    const resumeOptions = document.querySelectorAll('h3.t-12.t-bold.jobs-document-upload-redesign-card__file-name');
    resumeOptions.forEach(option => {
        if (option.textContent.trim() === userInfo.resumeLabel) {
            option.closest('.jobs-document-upload-redesign-card__container').click();
        }
    });

    // Click the Next button after selecting the resume
    const nextButton = await waitForElement('button[data-easy-apply-next-button]', 5000);
    nextButton.click();

    // Wait for the additional questions section to load
    await new Promise(r => setTimeout(r, 2000)); // Adjust timing as necessary
    fillAdditionalQuestions();
}

async function fillAdditionalQuestions() {
    // Fill in the years of experience for CSM
    const csmExperienceInput = await waitForElement('input[id^="single-line-text-form-component-formElement"][aria-describedby*="csm"]', 5000);
    csmExperienceInput.value = userInfo.csmExperienceYears;

    // Fill in the years of experience for ITSM
    const itsmExperienceInput = await waitForElement('input[id^="single-line-text-form-component-formElement"][aria-describedby*="itsm"]', 5000);
    itsmExperienceInput.value = userInfo.itsmExperienceYears;

    // Fill in the years of experience for ServiceNow
    const serviceNowExperienceInput = await waitForElement('input[id^="single-line-text-form-component-formElement"][aria-describedby*="ServiceNow"]', 5000);
    serviceNowExperienceInput.value = userInfo.serviceNowExperienceYears;

    // Click the Review button
    const reviewButton = await waitForElement('button[aria-label="Review your application"]', 5000);
    reviewButton.click();

    // Wait for the review page to load and submit the application
    await new Promise(r => setTimeout(r, 2000)); // Adjust timing as necessary
    submitApplication();
}

async function submitApplication() {
    const submitButton = await waitForElement('button[aria-label="Submit application"]', 5000);
    submitButton.click();

    // Handle the potential popup after submission
    await handlePostSubmitPopup();
}

async function handlePostSubmitPopup() {
    try {
        const noThanksButton = await waitForElement('button[aria-label="Dismiss"], button span.artdeco-button__text:contains("No thanks")', 10000);
        noThanksButton.click();
    } catch (error) {
        console.log("No popup appeared or was not handled correctly.");
    }
}

// New function to select and apply to a set number of jobs
async function applyToSetNumberOfJobs() {
    const jobCards = document.querySelectorAll('a[data-control-name="A_jobssearch_job_result_click"]'); // Adjust selector as needed
    let applicationsSubmitted = 0;

    for (let i = 0; i < jobCards.length && applicationsSubmitted < maxApplications; i++) {
        jobCards[i].click(); // Open job posting
        await new Promise(r => setTimeout(r, 5000)); // Wait for job details to load

        try {
            await fillAndSubmitForm(); // Apply to the job
            applicationsSubmitted++;
            console.log(`Applied to ${applicationsSubmitted} job(s).`);
        } catch (error) {
            console.error("Error applying to job:", error);
        }

        window.history.back(); // Go back to the job listings page
        await new Promise(r => setTimeout(r, 3000)); // Wait for the job listings page to reload

        if (applicationsSubmitted >= maxApplications) {
            console.log("Reached the maximum number of applications.");
            break;
        }
    }
}

// Start the process
applyToSetNumberOfJobs().catch(console.error);
