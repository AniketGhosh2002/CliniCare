document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const specialization = urlParams.get('specialization');

    const doctorName = urlParams.get('doctor');
    const searchQuery = urlParams.get('search');

    const specializationTitle = document.getElementById('specialization-title');
    const doctorsList = document.getElementById('doctors-list');
    const appointmentForm = document.querySelector('form.row.g-3');
    const slotDateInput = document.getElementById('slot-date');
    const slotTimeSelect = document.getElementById('slot-time');
    const receiptSection = document.getElementById('receipt-section');
    const receiptContent = document.getElementById('receipt-content');
    const downloadReceiptButton = document.getElementById('download-receipt');
    const doctorNameElement = document.getElementById('doctorOrlabtest-name');
    const doctorSpecialist = document.getElementById('specialist');
    const doctorSlotsElement = document.getElementById('doctorOrlabtest-slots');
    const specializationInput = document.getElementById('specialization');
    
    const doctorsData = {
        cardiology: [
            {name: "Dr. Soham Sen", image: "images/maleDoc.jpg", specialist: "Cardiologist", details: "MBBS-General Medicine, MS-Cardiologist", slots: {Monday: ["10 AM - 12 PM", "1 PM - 3 PM"], Friday: ["12PM - 2PM", "4PM - 5:30PM"], Saturday: ["12PM - 2PM", "4PM - 5:30PM"]}, fees: "600"},
            {name: "Dr. Shibam Mishra", image: "images/maleDoc.jpg", specialist: "Cardiologist", details: "MBBS-General Medicine, MS-Cardio Surgeon", slots: {Monday: ["2 PM - 4 PM", "4 PM - 6 PM"], Tuesday: ["2 PM - 4 PM", "4 PM - 6 PM"], Wednesday: ["2 PM - 4 PM", "4 PM - 6 PM"], Saturday: ["6PM - 8PM"]}, fees: "550"},
            {name: "Dr. Sudeshna Roy", image: "images/femaleDoc.jpg", specialist: "Cardiologist", details: "MBBS, MS-Cardio Surgeon",slots: {Tuesday: ["11 AM - 1 PM", "2 PM - 4 PM"], Thursday: ["12 PM - 2 PM","4 PM - 6 PM"], Saturday: ["11 PM - 1 PM","12PM - 2PM"], Sunday: ["12PM - 2PM","3 PM - 5 PM"]}, fees: "700"},
            {name: "Dr. krishna Biswas", image: "images/maleDoc.jpg", specialist: "Cardiologist", details: "MBBS, MS-Chest Specialist",slots: {Thursday: ["3 PM - 5 PM"]}, fees: "800"}
        ],
        neurology: [
            {name: "Dr. Avishek Chatterjee", image: "images/maleDoc.jpg", specialist: "Neurologist", details: "MBBS, MS-Neurosurgeon",slots: {Monday: ["11 AM - 1 PM", "2 PM - 4 PM"], Tuesday: ["11 AM - 1 PM", "2 PM - 4 PM"],Friday: ["12 PM - 2 PM", "4 PM - 6 PM"],}, fees: "700"},
            {name: "Dr. Dhriti Basu", image: "images/femaleDoc.jpg", specialist: "Neurologist", details: "MBBS, MD-Nurologist",slots: {Thursday: ["3 PM - 5 PM", "5 PM - 7 PM", "7 PM - 9 PM"]}, fees: "600"},
            {name: "Dr. Siddharth Dasgupta", image: "images/maleDoc.jpg", specialist: "Neurologist", details: "MBBS, MS-Nuerosurgeon",slots: {Monday: ["12 PM - 2 PM","4 PM - 6 PM"],Wednesday: ["1 PM - 3 PM","5 PM - 7 PM"], Thursday: ["5 PM - 7 PM", "7 PM - 9 PM"]}, fees: "500"},
            {name: "Dr. Angik Chakraborty",  image: "images/maleDoc.jpg", specialist: "Neurologist", details: "MBBS, MS-Nuerosurgeon",slots: {Sunday: ["1 PM - 3:30 PM","7 PM - 9 PM"],Saturday: ["4 PM - 6 PM","7 PM - 9 PM"]}, fees: "500"}
        ],
        dermatology: [
            { name: "Dr. Supratim Saha", image: "images/maleDoc.jpg", specialist: "Dermatologist" , details: "MBBS-General Medicine, MD-Dermatology", slots: { Saturday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM"], Monday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM"], Wednesday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM"] } ,fees: "500"},
            { name: "Dr. Kathakali Chatterjee", image: "images/femaleDoc.jpg", specialist: "Dermatologist" , details: "MBBS-General Medicine, MD-Dermatology", slots: { Saturday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM"], Sunday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM"] } ,fees: "500"},
            { name: "Dr. Sekhar Haldar", image: "images/maleDoc.jpg", specialist: "Dermatologist" , details: "MBBS-General Medicine, MD-Dermatology, Venerology & Laprosy", slots: { Monday: ["12 PM - 2 PM","2 PM - 4 PM", "4 PM - 6 PM"] } ,fees: "600"}
        ],
        ophthamology: [
            { name: "Dr. Diptanshu Das", image: "images/maleDoc.jpg", specialist: "Opthamologist" , details: "MBBS, MD-Opthamology", slots: { Saturday: ["11 AM - 1 PM", "2 PM - 4 PM"], Sunday: ["11 AM - 1 PM", "2 PM - 4 PM"], Monday: ["11 AM - 1 PM", "2 PM - 4 PM"], Wednesday: ["11 AM - 1 PM", "2 PM - 4 PM"] } ,fees: "600"},
            { name: "Dr. Prasenjit Mukherjee", image: "images/maleDoc.jpg", specialist: "Opthamologist" , details: "MS-Opthamology", slots: { Thursday: ["10 AM - 12 PM", "12 PM - 2 PM"], Friday: ["10 AM - 12 PM", "12 PM - 2 PM"], Sunday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM"] } ,fees: "500"},
            { name: "Dr. Sibnath Mandal", image: "images/maleDoc.jpg", specialist: "Opthamologist" , details: "MBBS, MS-Opthamology", slots: { Tuesday: ["9 AM - 11 AM","12 PM - 2 PM", "3 PM - 5 PM"], Wednesday: ["9 AM - 11 AM","12 PM - 2 PM", "3 PM - 5 PM"] } ,fees: "600"},
            { name: "Dr. Ritika Pramanik", image: "images/femaleDoc.jpg", specialist: "Opthamologist" , details: "MBBS, MD-Opthamology", slots: { Monday: ["9 AM - 12 PM", "2 PM - 5 PM"], Tuesday: ["9 AM - 12 PM", "2 PM - 5 PM"], Wednesday: ["9 AM - 12 PM", "2 PM - 5 PM"], Thursday: ["9 AM - 12 PM", "2 PM - 5 PM"], Friday: ["9 AM - 12 PM", "2 PM - 5 PM"] } ,fees: "400"}
        ],
        gynaecology: [
            { name: "Dr. Polly Chatterjee", image: "images/femaleDoc.jpg", specialist: "Gynaecologist" , details: "MBBS-General Medicine, MD-Obsteatrics & Gynaecology, DNB-Obsteatrics & Gynaecology", slots: { Tuesday: ["4 PM - 6 PM"] } ,fees: "1000"},
            { name: "Dr. Chaitali Roy", image: "images/femaleDoc.jpg", specialist: "Gynaecologist" , details: "MBBS, MD-Obsteatrics & Gynaecology, MRCOG(UK)", slots: { Saturday: ["9 AM - 11 AM", "11 AM - 1 PM", "3 PM - 5 PM", "5 PM - 7 PM"], Sunday: ["9 AM - 11 AM", "11 AM - 1 PM", "3 PM - 5 PM", "5 PM - 7 PM"], Monday: ["9 AM - 11 AM", "11 AM - 1 PM", "3 PM - 5 PM", "5 PM - 7 PM"], Wednesday: ["9 AM - 11 AM", "11 AM - 1 PM", "3 PM - 5 PM", "5 PM - 7 PM"] } ,fees: "800"},
            { name: "Dr. Barnali Ghosh", image: "images/femaleDoc.jpg", specialist: "Gynaecologist" , details: "MBBS, MD-Obsteatrics & Gynaecology", slots: { Monday: ["7:30 PM - 9:30 PM"], Thursday: ["7:30 PM - 9:30 PM"] } ,fees: "600"}
        ],
        paediatrics: [
            { name: "Dr. MD. Fahim Sarwar", image: "images/maleDoc.jpg", specialist: "Paediatrician" , details: "MBBS-General Medicine, MD-Paediatrics", slots: { Tuesday: ["10 AM - 12 PM","4 PM - 6 PM"], Saturday: ["9 AM - 11 AM", "11 AM - 1 PM", "3 PM - 5 PM", "5 PM - 7 PM"] } ,fees: "500"},
            { name: "Dr. Debanjan Saha", image: "images/maleDoc.jpg", specialist: "Paediatrician" , details: "MBBS-General Medicine, MD-Paediatrics", slots: { Sunday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM"], Monday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM"] } ,fees: "500"},
            { name: "Dr. Sutapa Chatterjee", image: "images/femaleDoc.jpg", specialist: "Paediatrician" , details: "MBBS-General Medicine, Diploma-Paediatrics", slots: { Wednesday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM", "6 PM - 8 PM"], Thursday: ["10 AM - 12 PM", "12 PM - 2 PM"], Friday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM", "6 PM - 8 PM"], Saturday: ["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM", "6 PM - 8 PM"] } ,fees: "500"}
        ],
        orthopedics: [
            {name: "Dr. Dhiman Das", image: "images/maleDoc.jpg", specialist: "Orthopedist", details: "MBBS, MD-Medicine", slots: {Friday: ["9 AM - 11 AM", "11 AM - 1 PM", "4 PM - 6 PM" ],Monday: ["10 AM - 12 PM", "12 PM - 2 PM"]}, fees: "500"},
            {name: "Dr. Aritri Ghosh", image: "images/femaleDoc.jpg", specialist: "Orthopedist", details: "MBBS, MS-Orthopedic Surgeon",slots: {Saturday: ["10 AM - 12 PM", "1 PM - 3 PM"],Sunday: ["11 AM - 1 PM", "2 PM - 4 PM"]}, fees: "700"},
            {name: "Dr. Suraj Kumar", image: "images/maleDoc.jpg", specialist: "Orthopedist", details: "MBBS, MS-Orthopedic Surgeon",slots: {Wednesday: ["11 AM - 1 PM", "5 PM - 7 PM"],Friday: ["10 AM - 12 PM", "1 PM - 3 PM"],Sunday: ["1 PM - 3 PM", "4 PM - 6 PM"]}, fees: "500"},
            {name: "Dr. Riddhi Basu", image: "images/femaleDoc.jpg", specialist: "Orthopedist", details: "MBBS, MS-Orthopedic Surgeon",slots: {Tuesday: ["10 AM - 12 PM", "1 PM - 3 PM"],Wednesday: ["5 PM - 7:30 PM"],Thursday: ["10 AM - 12:30 PM"]}, fees: "600"}
        ],
        dental: [
            {name: "Dr. Sunsuna Das Ghosh", image: "images/femaleDoc.jpg", specialist: "Dentist", details: "MBBS, MD-Medicine",slots: {Friday: ["9 AM - 11 AM", "11 AM - 1 PM", "2 PM - 4 PM"],Saturday: ["9 AM - 11 AM", "11 AM - 1 PM"],Sunday: ["11 AM - 1 PM", "3 PM - 5 PM"]}, fees: "400"},
            {name: "Dr. Chiranjit Ghosh", image: "images/maleDoc.jpg", specialist: "Dentist", details: "MBBS, MS-Dental Surgeon",slots: {Saturday: ["10 AM - 12 PM", "1 PM - 3 PM"],Tuesday: ["10 AM - 12 PM", "1 PM - 3 PM","4 PM - 5:30 PM"],Wednesday: ["10 AM - 12:30 PM","5 PM - 7:30 PM"],Thursday: ["10 AM - 12:30 PM"]}, fees: "500"},
            {name: "Dr. Amit Desai", image: "images/maleDoc.jpg", specialist: "Dentist", details: "MBBS, MS-Dental Surgeon",slots: {Monday: ["9 AM - 11 AM", "2:30 PM - 4:30 PM"],Tuesday: ["10 AM - 12 PM", "1 PM - 3 PM"],Saturday: ["5 PM - 7:30 PM"]}, fees: "500"}
        ],
        pulmonology: [
            {name: "Dr. Shobita Das Ghosh", image: "images/femaleDoc.jpg", specialist: "Pulmonologist", details: "MBBS, MD-Medicine",slots: {Friday: ["9 AM - 11 AM", "11 AM - 1 PM"],Sunday: ["11 AM - 1 PM", "3 PM - 5 PM"]}, fees: "500"},
            {name: "Dr. Pradeep Roy", image: "images/maleDoc.jpg", specialist: "Pulmonologist", details: "MBBS, MS-Surgeon",slots: {Saturday: ["10 AM - 12 PM", "1 PM - 3 PM"],Wednesday: ["5 PM - 7.30 PM"],Thursday: ["10 AM - 12.30 PM"]}, fees: "500"},
            {name: "Dr. Arpita Sur", image: "images/femaleDoc.jpg", specialist: "Pulmonologist", details: "MBBS, MS-Pulmonology",slots: {Tuesday: ["10 AM - 12 PM", "1 PM - 3 PM"],Monday: ["5 PM - 7.30 PM"]},fees: "600"}
        ],
        ent: [
            {name: "Dr. Shivank Seikh", image: "images/maleDoc.jpg", specialist: "ENT", details: "MBBS, MD-ENT",slots: {Monday: ["9 AM - 11 AM", "2 PM - 4 PM"],Friday: ["11 AM - 12:30 PM", "2 PM - 3 PM"],Saturday: ["10 AM - 11:30 AM", "12 PM - 1:30 PM"],Sunday: ["11 AM - 1 PM"]}, fees: "700"},
            {name: "Dr. Sambit Raut", image: "images/maleDoc.jpg", specialist: "ENT", details: "MBBS-Medicine, MS-ENT",slots: {Monday: ["11 AM - 1 PM", "3 PM - 5 PM", "5 PM - 7 PM"],Tuesday: ["11 AM - 1 PM", "3 PM - 5 PM", "5 PM - 7 PM"],Wednesday: ["2 PM - 4:30 PM","6 PM - 8:30 PM"]},fees: "500"},
            {name: "Dr. Sreedipa Bhar", image: "images/femaleDoc.jpg", specialist: "ENT", details: "MBBS, MS-ENT",slots: {Wednesday: ["8 AM - 10:30 AM", "2 PM - 3:30 PM"],Thursday: ["11 AM - 12:30 PM", "2 PM - 3 PM"],Saturday: ["5 PM - 7:30 PM"],Friday: ["2 PM - 4 PM"]},fees: "600"}
        ],
        haematology: [
            {name: "Dr. Prerna Pramanik", image: "images/femaleDoc.jpg", specialist: "Haematology", details: "MBBS-General Medicine, Diploma-General Medicine, DM-Haematology",slots: {Tuesday: ["10 AM - 11:30 AM", "3:30 PM - 5 PM"],Friday: ["10 AM - 11:30 AM", "3:30 PM - 5 PM"],Saturday: ["10 AM - 11:30 AM", "3:30 PM - 5 PM"],Sunday: ["10 AM - 11:30 AM", "3:30 PM - 5 PM"]}, fees: "900"},
            {name: "Dr. Kaushik Paul", image: "images/maleDoc.jpg", specialist: "Haematology", details: "MBBS-General Medicine, Diploma-General Medicine, DM-Haematology",slots: {Monday: ["8 AM - 10 AM", "4 PM - 5:30 PM", "6 PM - 7 PM"],Tuesday: ["8 AM - 10 AM", "4 PM - 5:30 PM", "6 PM - 7 PM"],Wednesday: ["8 AM - 10 AM", "6 PM - 7 PM"]},fees: "1000"},
            {name: "Dr. Tusti Ganguly", image: "images/femaleDoc.jpg", specialist: "Haematology", details: "MBBS-General Medicine, Diploma-General Medicine, DM-Haematology",slots: {Wednesday: ["8 AM - 10:30 AM"],Thursday: ["11:30 AM - 12:30 PM", "4 PM - 5:30 PM"],Saturday: ["11:30 AM - 12:30 PM", "4 PM - 5:30 PM"],Sunday: ["1 PM - 2:30 PM"]},fees: "1000"}
        ],
        'general physician':[
            {name: "Dr. Deeptanil Pakira", image: "images/maleDoc.jpg", specialist: "General Physician", details: "MBBS, MD-Medicine",slots: {Wednesday: ["9 AM - 11 AM", "12 PM - 1 PM"],Sunday: ["10 AM - 12 PM"]}, fees: "700"},
            {name: "Dr. Shipra Ghosh", image: "images/femaleDoc.jpg", specialist: "General Physician", details: "MBBS-Medicine",slots: {Thursday: ["11 AM - 1 PM"],Saturday: ["6 PM - 8:30 PM"]},fees: "500"},
            {name: "Dr. Basudeb Mukherjee", image: "images/maleDoc.jpg", specialist: "General Physician", details: "MBBS, MS-Medicine",slots: {Monday: ["1 PM - 2:30 PM"],Tuesday: ["4 PM - 6:30 PM"],Friday: ["7 PM - 9 PM"]},fees: "600"},
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

    function findDoctor() {
        for (const specialty in doctorsData) {
            const doctor = doctorsData[specialty].find(doc => doc.name === doctorName);
            if (doctor) {
                return { ...doctor, specialization: specialty };
            }
        }
        return null;
    }
    

    function updateDoctorInfo() {
        const doctor = findDoctor();
        if (doctor) {
            doctorNameElement.textContent = `${doctor.name}`;
            doctorSpecialist.textContent = `${doctor.specialist}`;
            const availableDays = Object.keys(doctor.slots).join(', ');
            doctorSlotsElement.textContent = `Available Slots: ${availableDays}`;
            specializationInput.value = doctor.specialization.charAt(0).toUpperCase() + doctor.specialization.slice(1);
            
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
        const doctor = findDoctor();
        const receiptHTML = `
        <div class="receipt-form-download" id="receipt-form-download" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc;">
            <div style="text-align: center; font-size: 2.5rem; color: hwb(216 25% 19%);">
            <i class="fa-solid fa-stethoscope"> CliniCare </i>
            </div>
            <h3 style="text-align: center; margin-top: 30px;">Consultant Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Consultant Name:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${doctor.name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Specialization:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${doctor.specialist}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Degree:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${doctor.details}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Fees:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">₹ ${doctor.fees}</td>
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
            link.download = `${id}_DocReceipt_${name}.png`;
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
        const doctor = findDoctor();
        const today = new Date();
        
        if (selectedDate < today) {
            slotDateInput.value = ''; 
        } else if (doctor) {
            const availableSlots = doctor.slots[dayName];
            populateSlots(availableSlots);
        }
    });

    appointmentForm?.addEventListener('submit', handleFormSubmit);

    function displayDoctors(doctors) {
        doctorsList.innerHTML = ""; 
        if (doctors && doctors.length > 0) {
            doctors.forEach(doctor => {
                const doctorDiv = document.createElement('div');
                doctorDiv.className = 'doctor';
                doctorDiv.innerHTML = `
                    <img src="${doctor.image}" height="200px" width="200px filter: drop-shadow(2px 2px 4px #555)">
                    <h3>${doctor.name}</h3>
                    <p>${doctor.specialist}, ${doctor.details}</p>
                    <p>Available Slots:</p>
                    <ul>
                        ${Object.keys(doctor.slots).map(day => `
                        <li>${day}: ${doctor.slots[day].join(', ')}</li>
                        `).join('')}
                    </ul>
                    <p>Fees: ₹ ${doctor.fees}</p>
                    <div class="col-12">
                    <button type="submit" class="btn btn-outline-success" onclick="window.location.href='appointment.html?doctor=${encodeURIComponent(doctor.name)}'">Book Appointment</button>
                    </div>
                `;
                doctorsList.appendChild(doctorDiv);
            });
        } else {
            doctorsList.innerHTML = `<p>No doctors available.</p>`;
        }
    }
    
    if (specialization) {
        specializationTitle.textContent = `${specialization.charAt(0).toUpperCase() + specialization.slice(1)} Doctors`;
        const doctors = doctorsData[specialization.toLowerCase()];
        displayDoctors(doctors);
    } else if (searchQuery) {
        const matchedDoctors = [];
        for (const specialty in doctorsData) {
            const foundDoctors = doctorsData[specialty].filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));
            matchedDoctors.push(...foundDoctors);
        }
        if (matchedDoctors.length > 0) {
            specializationTitle.textContent = `Search Results for "${searchQuery}"`;
            displayDoctors(matchedDoctors);
        } else {
            specializationTitle.textContent = `No results found for "${searchQuery}"`;
            doctorsList.innerHTML = `<p>No doctors available.</p>`;
        }
    } else if (doctorName) {
        updateDoctorInfo();
    } else {
        doctorsList.innerHTML = `<p>Specialization or doctor not specified.</p>`;
    }
});


