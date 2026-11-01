const subjects = [
    {
        code: "C04ID0001",
        name: "Entrepreneurship",
        description: "Explore how to shape ideas into ventures, understand customers, and develop the mindset and skills to build something new."
    },
    {
        code: "C05BC3101",
        name: "Mathematics 1",
        description: "Build mathematical foundations for computing, including problem-solving methods and concepts used throughout your studies."
    },
    {
        code: "C05BC3102",
        name: "Architectural Of Computer",
        description: "Learn the basic organization and operation of computer systems, from processor components to memory and instructions."
    },
    {
        code: "C05BC3103",
        name: "Programming Practice 1",
        description: "Practice programming fundamentals by writing, testing, and improving programs to solve structured problems."
    },
    {
        code: "C05BC3104",
        name: "Basics of Web Development",
        description: "Create web pages and learn the core technologies used to build and style content for the web."
    },
    {
        code: "C05BC3105",
        name: "Environmental Science",
        description: "Study the natural environment, human impacts, and practical approaches to sustainability and conservation."
    }
];

const subjectButtons = document.querySelectorAll(".subject-option");
const detailCode = document.querySelector("#detail-code");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");
const detailIndex = document.querySelector("#detail-index");

function displaySubject(index) {
    const subject = subjects[index];
    if (!subject) return;

    subjectButtons.forEach((button, buttonIndex) => {
        const isSelected = buttonIndex === index;
        button.setAttribute("aria-pressed", String(isSelected));
    });

    detailCode.textContent = subject.code;
    detailTitle.textContent = subject.name;
    detailDescription.textContent = subject.description;
    detailIndex.textContent = String(index + 1).padStart(2, "0");
}

function createSubjectButton(subject, index) {
    const button = subjectButtons[index];
    const number = document.createElement("span");
    const copy = document.createElement("span");
    const title = document.createElement("span");
    const code = document.createElement("span");

    button.append(number, copy);
    number.className = "subject-number";
    number.textContent = String(index + 1).padStart(2, "0");
    copy.className = "subject-option-copy";
    title.className = "subject-option-title";
    title.textContent = subject.name;
    code.className = "subject-option-code";
    code.textContent = subject.code;
    copy.append(title, code);

    button.addEventListener("click", () => displaySubject(index));
}

subjects.forEach(createSubjectButton);
displaySubject(0);
