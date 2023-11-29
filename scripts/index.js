

const uploadBtn = document.querySelector(".upload-entry-button")
const entriesBtn = document.querySelector(".entries-button")
const uploadSection = document.querySelector(".upload-entry")
const entriesSection = document.querySelector(".entries-section")

const entriesContainer = document.querySelector(".entries-container")
const entryForm = document.querySelector(".entry-form")

const url = "https://flight-diary.vercel.app/api/diaries/";
uploadBtn.onclick = toggleUploadSection;
entriesBtn.onclick = toggleEntriesSection;

entryForm.addEventListener("submit",(e) =>{
    e.preventDefault()

    const formValues = {
    date:e.srcElement[0].value,
    weather:e.srcElement[1].value,
    visibility:e.srcElement[2].value,
    comment:e.srcElement[3].value        

    }
    if(formValues.date && formValues.weather && formValues.visibility && formValues.comment !== ''){
        postEntry(url,formValues)
    }
    else{
        alert('Please fill all fields')
    }
})
function toggleUploadSection(){

        uploadSection.classList.remove("hidden");
        entriesSection.classList.add("hidden");
 
 
}
function toggleEntriesSection(){

        entriesSection.classList.remove("hidden");
        uploadSection.classList.add("hidden");
        fetchingEntries("https://flight-diary.vercel.app/api/diaries/");
}

const fetchingEntries = async (url) => {
    try {
        const res = await fetch(url, { mode: 'cors' });
        const entries = await res.json();
        console.log(entries);

        entries.forEach(entry => {

            entriesContainer.innerHTML += `
            
            <div class="entry bg-blue-300/30 grid grid-rows-3 text-xl font-semibold gap-y-4 items-center text-center border-2 text-blue-800 rounded-lg border-blue-300 ">
            <div class="grid grid-cols-2 border-b-2 h-full rounded-md items-center  border-blue-300">
                <p class="text-lg">ID:</p>
                <p class="text-lg">Date:</p>
                <p class="entry-id   font-light ">#${entry.id}</p>
                <p class="entry-date  font-light ">${entry.date}</p>
            </div>
            <div class="grid grid-cols-2 border-b-2 h-full rounded-md items-center border-blue-300">
                <p class="text-lg">Weather: </p>
                <p class="text-lg row-2">Visibility:</p>
                <p class="entry-weather  font-light ">${entry.weather.charAt(0).toUpperCase() + entry.weather.slice(1)}</p>
                <p class="entry-visibility  font-light ">${entry.visibility.charAt(0).toUpperCase() + entry.visibility.slice(1)}</p>
            </div>
            <div class="p-1">
                <p class="text-lg">Comment:</p>
                <p class="entry-comment col-span-2 font-light ">${entry.comment.charAt(0).toUpperCase() + entry.comment.slice(1)}</p>
            </div>
        </div>
            ` 
            
        });

        return entries;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}


const postEntry = async (url,{date,weather,comment,visibility})=>{

    console.log(date,weather,comment,visibility);
   try {
    const res = await fetch(url,{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "date":date,
            "weather":weather,
            "visibility":visibility,
            "comment":comment

        })

    }
    
    )
    alert("The entry has been created succesfully")

   } catch (error) {

   }
}







