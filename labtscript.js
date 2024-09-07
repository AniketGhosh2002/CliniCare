document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const specialization = urlParams.get('specialization');

    const labtestName = urlParams.get('labtest');
    const searchQuery = urlParams.get('search'); 

    const specializationTitle = document.getElementById('specialization-title');
    const labtestsList = document.getElementById('labtests-list');
    const appointmentForm = document.querySelector('form.row.g-3');
    const slotDateInput = document.getElementById('slot-date');
    const slotTimeSelect = document.getElementById('slot-time');
    const receiptSection = document.getElementById('receipt-section');
    const receiptContent = document.getElementById('receipt-content');
    const downloadReceiptButton = document.getElementById('download-receipt');
    const labtestNameElement = document.getElementById('doctorOrlabtest-name');
    const labtestSpecialist = document.getElementById('specialist');
    const labtestSlotsElement = document.getElementById('doctorOrlabtest-slots');
    
    const labtestsData = {
        'x-ray':[
            {name: "Chest X-Ray", icon: "fa-solid fa-x-ray", specialist: "X - Ray", details: "Chest X-Ray for detecting lung conditions and heart enlargement.", slots: {Tuesday: ["9 AM - 12 PM", "1 PM - 4 PM"], Wednesday: ["9 AM - 12 PM", "1 PM - 4 PM"], Friday: ["9 AM - 12 PM", "1 PM - 4 PM"], Saturday: ["10 AM - 2 PM"]}, charges: "300"},
            {name: "Abdomen X-Ray", icon: "fa-solid fa-x-ray", specialist: "X - Ray", details: "Abdomen X-Ray for diagnosing abdominal pain and conditions.", slots: {Monday: ["10 AM - 1 PM", "3 PM - 6 PM"], Thursday: ["10 AM - 1 PM", "3 PM - 6 PM"], Friday: ["10 AM - 1 PM"], Sunday: ["10 AM - 2 PM"]}, charges: "350"},
            {name: "Spine X-Ray", icon: "fa-solid fa-x-ray", specialist: "X - Ray", details: "Spine X-Ray for assessing spinal injuries and disorders.", slots: {Tuesday: ["8 AM - 12 PM", "2 PM - 5 PM"], Thursday: ["8 AM - 12 PM", "2 PM - 5 PM"], Saturday: ["9 AM - 1 PM"], Sunday: ["9 AM - 1 PM"]}, charges: "400"},
            {name: "Pelvis X-Ray", icon: "fa-solid fa-x-ray", specialist: "X - Ray", details: "Pelvis X-Ray for evaluating pelvic fractures and abnormalities.", slots: {Monday: ["9 AM - 12 PM", "2 PM - 4 PM"], Wednesday: ["9 AM - 12 PM", "2 PM - 4 PM"], Friday: ["9 AM - 12 PM"], Saturday: ["10 AM - 2 PM"]}, charges: "450"},
            {name: "Shoulder X-Ray", icon: "fa-solid fa-x-ray", specialist: "X - Ray", details: "Shoulder X-Ray for diagnosing shoulder joint issues and injuries.", slots: {Monday: ["9 AM - 12 PM", "1 PM - 4 PM"], Tuesday: ["9 AM - 12 PM", "1 PM - 4 PM"], Thursday: ["9 AM - 12 PM"], Saturday: ["10 AM - 2 PM"]}, charges: "320"},
            {name: "Leg X-Ray", icon: "fa-solid fa-x-ray", specialist: "X - Ray", details: "Leg X-Ray for detecting fractures and conditions of the leg.", slots: {Tuesday: ["8 AM - 12 PM", "2 PM - 6 PM"], Wednesday: ["8 AM - 12 PM", "2 PM - 6 PM"], Friday: ["8 AM - 12 PM"], Sunday: ["10 AM - 2 PM"]}, charges: "350"},
            {name: "Toe X-Ray", icon: "fa-solid fa-x-ray", specialist: "X - Ray", details: "Toe X-Ray for evaluating injuries and disorders of the toes.", slots: {Monday: ["9 AM - 11 AM", "1 PM - 3 PM"], Thursday: ["9 AM - 11 AM", "1 PM - 3 PM"], Saturday: ["10 AM - 1 PM"], Sunday: ["10 AM - 1 PM"]}, charges: "200"},
            {name: "Skull X-Ray", icon: "fa-solid fa-x-ray", specialist: "X - Ray", details: "Skull X-Ray for assessing skull fractures and abnormalities.", slots: {Tuesday: ["8 AM - 12 PM", "2 PM - 6 PM"], Wednesday: ["8 AM - 12 PM", "2 PM - 6 PM"], Saturday: ["8 AM - 12 PM", "2 PM - 6 PM"], Sunday: ["8 AM - 12 PM", "2 PM - 6 PM"]}, charges: "250"}
        ],
        'blood test':[
            {name: "Complete Blood Count", icon: "fa-solid fa-vial", specialist: "Blood Test", details: "CBC-EDTA Whole Blood",slots: {Tuesday: ["8 AM - 12 PM", "2 PM - 6 PM"], Wednesday: ["8 AM - 12 PM", "2 PM - 6 PM"], Saturday: ["8 AM - 12 PM", "2 PM - 6 PM"], Sunday: ["8 AM - 12 PM", "2 PM - 6 PM"]}, charges: "399"},
            {name: "Fasting Blood Sugar", icon: "fa-solid fa-vial", specialist: "Blood Test", details: "Glucose Fasting (FBS) - Sodium Flouride",slots: {Tuesday: ["7 AM - 10 AM"],Thursday: ["7 AM - 10 AM"],Saturday: ["7:30 AM - 10 AM"], Sunday: ["7:30 AM - 10 AM"]},charges: "163"},
            {name: "Post Blood Sugar", icon: "fa-solid fa-vial", specialist: "Blood Test", details: "Glucose Post Prandial (PPBS)",slots: {Tuesday: ["2  PM - 4 PM"],Thursday: ["2 PM - 4 PM"],Saturday: ["1:30 PM - 4 PM"], Sunday: ["1:30 PM - 4 PM"]},charges: "249"},
            {name: "Liver Function", icon: "fa-solid  fa-vial", specialist: "Blood Test", details: "Liver Function Test (LFT)",slots: {Monday: ["9 AM - 1 PM", "2 PM - 6 PM"],Thursday: ["9 AM - 1 PM", "2 PM - 6 PM"],Friday: ["9 AM - 1 PM", "2 PM - 6 PM"],Saturday: ["9 AM - 1 PM", "2 PM - 6 PM"],Sunday: ["9 AM - 1 PM", "2 PM - 6 PM"]},charges: "699"},
            {name: "Thyroid Test", icon: "fa-solid  fa-vial", specialist: "Blood Test", details: "Thyroid Stimulating Hormone (TSH) - Serum",slots: {Monday: ["10 AM - 1 PM", "2 PM - 5 PM"],Thursday: ["10 AM - 1 PM", "2 PM - 5 PM"],Friday: ["10 AM - 1 PM", "2 PM - 5 PM"],Saturday: ["10 AM - 1 PM", "2 PM - 5 PM"],Sunday: ["10 AM - 1 PM", "2 PM - 5 PM"]},charges: "350"},
            {name: "Vitamin B12", icon: "fa-solid  fa-vial", specialist: "Blood Test", details: "Vitamin B12 - Serum",slots: {Tuesday: ["9 AM - 1 PM", "2 PM - 6 PM"],Wednesday: ["9 AM - 1 PM", "2 PM - 6 PM"],Friday: ["9 AM - 1 PM", "2 PM - 6 PM"],Saturday: ["9 AM - 1 PM", "2 PM - 6 PM"],Sunday: ["9 AM - 1 PM", "2 PM - 6 PM"]},charges: "599"},
            {name: "CRP Test", icon: "fa-solid  fa-vial", specialist: "Blood Test", details: "C-Reactive Protein (CRP) - Serum",slots: {Monday: ["9 AM - 1 PM", "2 PM - 6 PM"],Tuesday: ["9 AM - 1 PM", "2 PM - 6 PM"],Friday: ["9 AM - 1 PM", "2 PM - 6 PM"],Saturday: ["9 AM - 1 PM", "2 PM - 6 PM"],Sunday: ["9 AM - 1 PM", "2 PM - 6 PM"]},charges: "500"},
            {name: "Uric Acid Test", icon: "fa-solid  fa-vial", specialist: "Blood Test", details: "Uric Acid - Serum",slots: {Monday: ["9 AM - 1 PM", "2 PM - 6 PM"],Wednesday: ["9 AM - 1 PM", "2 PM - 6 PM"],Thursday: ["9 AM - 1 PM", "2 PM - 6 PM"],Saturday: ["9 AM - 1 PM", "2 PM - 6 PM"],Sunday: ["9 AM - 1 PM", "2 PM - 6 PM"]},charges: "366"}
        ],
        'urine test':[
            {name: "CUE Test", icon: "fa-solid fa-glass-water-droplet", specialist: "Urine Test", details: "Complete Urine Examination (CUE) - Spot Urine",slots: {Monday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Wednesday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Friday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Saturday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Sunday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"]}, charges: "290"},
            {name: "Urine Culture", icon: "fa-solid fa-glass-water-droplet", specialist: "Urine Test", details: "Culture And Sensitivity - Spot Urine",slots: {Monday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Wednesday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Friday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Saturday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Sunday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"]},charges: "699"},
            {name: "MPS Test", icon: "fa-solid fa-glass-water-droplet", specialist: "Urine Test", details: "Mucopolysaccharidosis (MPS) Screen, Spot Urine",slots: {Tuesday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Saturday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Sunday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"]},charges: "840"},
            {name: "Opiates Screen", icon: "fa-solid fa-glass-water-droplet", specialist: "Urine Test", details: "Opiates Screen, Spot Urine",slots: {Thursday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"],Sunday: ["8 AM - 10:30 AM", "11 PM - 12:30 PM"]},charges: "1540"}
        ]
        };

    function populateSlots(availableSlots) {
        slotTimeSelect.innerHTML = ""; 
        if (availableSlots && availableSlots.length > 0) {
            availableSlots.forEach(slot => {
                const option = document.createElement('option');
                option.value = slot;
                option.textContent = slot;
                slotTimeSelect.appendChild(option);
            });
        } else {
            slotTimeSelect.innerHTML = "<option value='' disabled>No available slots</option>";
        }
    }

    function findlabtest() {
        for (const specialty in labtestsData) {
            const labtest = labtestsData[specialty].find(lab => lab.name === labtestName);
            if (labtest) {
                return { ...labtest, specialization: specialty };
            }
        }
        return null;
    }
    
    function updatelabtestInfo() {
        const labtest = findlabtest();
        if (labtest) {
            labtestNameElement.textContent = `${labtest.name}`;
            labtestSpecialist.textContent = `${labtest.specialist}`;
            const availableDays = Object.keys(labtest.slots).join(', ');
            labtestSlotsElement.textContent = `Available Slots: ${availableDays}`;
            
        }
    }
    //booking receipt
    function handleFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const age = document.getElementById('age').value;
        const bloodGroup = document.getElementById('bloodgroup').value;
        const gender = document.getElementById('gender').value;
        const slotDate = document.getElementById('slot-date').value;
        const slotTime = document.getElementById('slot-time').value;
        const labtest = findlabtest();
        const receiptHTML = `
        <div class="receipt-form-download" id="receipt-form-download" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc;">
            <div style="text-align: center; font-size: 2.5rem; color: hwb(216 25% 19%);">
            <i class="fa-solid fa-stethoscope"> CliniCare </i>
            </div>
            <h3 style="text-align: center; margin-top: 30px;">Lab Test Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Test:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${labtest.name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Category:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${labtest.specialist}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Details:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${labtest.details}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Charges:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">₹ ${labtest.charges}</td>
                </tr>
            </table>
            <h3 style="text-align: center; margin-top: 30px;">Patient Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Patient Name:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Age:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${age}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Gender:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${gender}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Blood Group:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${bloodGroup}</td>
                </tr>
                
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Appointment Date:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${slotDate}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Time Slot:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${slotTime}</td>
                </tr>
            </table>
        </div>
    `;
    
    receiptContent.innerHTML = receiptHTML;
    receiptSection.style.display = 'block';
    downloadReceiptButton.style.display = 'block';
        
    downloadReceiptButton.addEventListener('click', function() {
        html2canvas(receiptSection).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            const id = generateNumberFromDateTime();
            link.download = `${id}_TestReceipt_${name}.png`;
            link.click();
        });
    });
    }
    //generate number for receipt
    function generateNumberFromDateTime() {
        const now = new Date();
    
        const day = now.getDate().toString().padStart(2, '0');   
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
        const year = now.getFullYear().toString().slice(-2);     
    
        const hours = now.getHours().toString().padStart(2, '0');  
        const minutes = now.getMinutes().toString().padStart(2, '0'); 
        const seconds = now.getSeconds().toString().padStart(2, '0'); 
    
        const number = `${hours}${minutes}${seconds}${day}${month}${year}`;
    
        return number;
    }

    slotDateInput?.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
        const labtest = findlabtest();
        const today = new Date();
        
        if (selectedDate < today) {
            slotDateInput.value = ''; 
        } else if (labtest) {
            const availableSlots = labtest.slots[dayName];
            populateSlots(availableSlots);
        }
    });

    appointmentForm?.addEventListener('submit', handleFormSubmit);

    function displaylabtests(labtests) {
        labtestsList.innerHTML = ""; 
        if (labtests && labtests.length > 0) {
            labtests.forEach(labtest => {
                const labtestDiv = document.createElement('div');
                labtestDiv.className = 'labtest';
                labtestDiv.innerHTML = `
                    <i class="${labtest.icon}" style="font-size: 7rem; color: hwb(216 25% 19%); padding: 1.5rem;"></i>
                    <h3>${labtest.name}</h3>
                    <p>${labtest.specialist}, ${labtest.details}</p>
                    <p>Available Slots:</p>
                    <ul>
                        ${Object.keys(labtest.slots).map(day => `
                        <li>${day}: ${labtest.slots[day].join(', ')}</li>
                        `).join('')}
                    </ul>
                    <p>charges: ₹ ${labtest.charges}</p>
                    <div class="col-12">
                    <button type="submit" class="btn btn-outline-success" onclick="window.location.href='appointment.html?labtest=${encodeURIComponent(labtest.name)}'">Book Appointment</button>
                    </div>
                `;
                labtestsList.appendChild(labtestDiv);
            });
        } else {
            labtestsList.innerHTML = `<p>No labtests available.</p>`;
        }
    }

    if (specialization) {
        specializationTitle.textContent = `${specialization.charAt(0).toUpperCase() + specialization.slice(1)}`;
        const labtests = labtestsData[specialization.toLowerCase()];
        displaylabtests(labtests);
    } else if (searchQuery) {
        const matchedlabtests = [];
        for (const specialty in labtestsData) {
            const foundlabtests = labtestsData[specialty].filter(lab => lab.name.toLowerCase().includes(searchQuery.toLowerCase()));
            matchedlabtests.push(...foundlabtests);
        }
        if (matchedlabtests.length > 0) {
            specializationTitle.textContent = `Search Results for "${searchQuery}"`;
            displaylabtests(matchedlabtests);
        } else {
            specializationTitle.textContent = `No results found for "${searchQuery}"`;
            labtestsList.innerHTML = `<p>No labtests available.</p>`;
        }
    } else if (labtestName) {
        updatelabtestInfo();
    } else {
        labtestsList.innerHTML = `<p>Specialization or labtest not specified.</p>`;
    }
});