

const uploadBtn = document.querySelector(".upload-entry-button")
const entriesBtn = document.querySelector(".entries-button")
const uploadSection = document.querySelector(".upload-entry")
const entriesSection = document.querySelector(".entries-section")

uploadBtn.onclick = toggleUploadSection;
entriesBtn.onclick = toggleEntriesSection;
function toggleUploadSection(){

        uploadSection.classList.remove("hidden");
        entriesSection.classList.add("hidden");
 
 
}
function toggleEntriesSection(){

        entriesSection.classList.remove("hidden");
        uploadSection.classList.add("hidden");
}

const fetchingEntries = async (url) => {
    try {
        const res = await fetch(url, { mode: 'no-cors' });
        const entries = await res.json();
        console.log(entries);
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

fetchingEntries("https://flight-diary.vercel.app/api/diaries/");


