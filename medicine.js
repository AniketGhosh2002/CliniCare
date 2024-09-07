document.addEventListener('DOMContentLoaded', () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        displayFilteredMedicines(searchQuery);
    } else {
        displayMedicines();
    }
    
    
});


const medicines = {
    'Pain Relief': [
        { name: 'Paracetamol', composition: 'Paracetamol 500mg', volume: "Strip- 20", price: 80, quantity: 0 },
        { name: 'Ibuprofen', composition: 'Ibuprofen 400mg', volume: "Strip- 20", price: 80, quantity: 0 },
        { name: 'Aspirin', composition: 'Aspirin 100mg', volume: "Strip- 20", price: 70, quantity: 0 },
        { name: 'Naproxen', composition: 'Naproxen 250mg', volume: "Strip- 10", price: 90, quantity: 0 },
        { name: 'Diclofenac', composition: 'Diclofenac 50mg', volume: "Strip- 15", price: 100, quantity: 0 }
    ],
    'Antibiotics': [
        { name: 'Amoxicillin', composition: 'Amoxicillin 500mg', volume: "Strip- 10", price: 100, quantity: 0 },
        { name: 'Azithromycin', composition: 'Azithromycin 500mg', volume: "Strip- 6", price: 150, quantity: 0 },
        { name: 'Ciprofloxacin', composition: 'Ciprofloxacin 500mg', volume: "Strip- 10", price: 120, quantity: 0 },
        { name: 'Doxycycline', composition: 'Doxycycline 100mg', volume: "Strip- 14", price: 140, quantity: 0 },
        { name: 'Clarithromycin', composition: 'Clarithromycin 500mg', volume: "Strip- 10", price: 130, quantity: 0 }
    ],
    'Digestive': [
        { name: 'Omeprazole', composition: 'Omeprazole 20mg', volume: "Strip- 14", price: 60, quantity: 0 },
        { name: 'Loperamide', composition: 'Loperamide 2mg', volume: "Strip- 10", price: 40, quantity: 0 },
        { name: 'Ranitidine', composition: 'Ranitidine 150mg', volume: "Strip- 15", price: 70, quantity: 0 },
        { name: 'Simethicone', composition: 'Simethicone 80mg', volume: "Strip- 30", price: 50, quantity: 0 },
        { name: 'Bismuth Subsalicylate', composition: 'Bismuth Subsalicylate 262mg', volume: 20, price: 60, quantity: 0 }
    ],
    'Vitamins': [
        { name: 'Vitamin C', composition: 'Vitamin C 500mg', volume: "Strip- 30", price: 80, quantity: 0 },
        { name: 'Vitamin D3', composition: 'Vitamin D3 1000 IU', volume: "Strip- 20", price: 90, quantity: 0 },
        { name: 'Multivitamins', composition: 'Multivitamins', volume: "Strip- 30", price: 120, quantity: 0 },
        { name: 'Vitamin B12', composition: 'Vitamin B12 1000mcg', volume: "Strip- 30", price: 100, quantity: 0 },
        { name: 'Folic Acid', composition: 'Folic Acid 400mcg', volume: "Strip- 30", price: 70, quantity: 0 }
    ],
    'Cold & Flu': [
        { name: 'Paracetamol Cold', composition: 'Paracetamol 500mg, Phenylephrine 10mg', volume: "Strip- 10", price: 60, quantity: 0 },
        { name: 'Cetirizine', composition: 'Cetirizine 10mg', volume: "Strip- 20", price: 70, quantity: 0 },
        { name: 'Cough Syrup', composition: 'Dextromethorphan 10mg/5ml', volume: "Bottle- 120ml", price: 100, quantity: 0 },
        { name: 'Nasal Spray', composition: 'Oxymetazoline 0.05%', volume: "Bottle- 15ml", price: 50, quantity: 0 }
    ],
    'Cardiovascular': [
        { name: 'Amlodipine', composition: 'Amlodipine 5mg', volume: "Strip- 30", price: 150, quantity: 0 },
        { name: 'Metoprolol', composition: 'Metoprolol 50mg', volume: "Strip- 20", price: 120, quantity: 0 },
        { name: 'Losartan', composition: 'Losartan 50mg', volume: "Strip- 28", price: 140, quantity: 0 },
        { name: 'Atorvastatin', composition: 'Atorvastatin 10mg', volume: "Strip- 30", price: 160, quantity: 0 }
    ]
};


    function displayMedicines() {
        const medicineListDiv = document.querySelector('.medicine-list');
        medicineListDiv.innerHTML = ''; 
    
        for (const category in medicines) {
            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';
            categorySection.innerHTML = `<h2>${category}</h2>`;
    
            const medicineItemsContainer = document.createElement('div');
            medicineItemsContainer.className = 'medicine-items'; 
    
            medicines[category].forEach(medicine => {
                const div = document.createElement('div');
                div.className = 'medicine-item';
                div.innerHTML = `
                    <h3>${medicine.name}</h3>
                    <p>Composition: ${medicine.composition}</p>
                    <p>${medicine.volume}</p>
                    <p>Price: ₹ ${medicine.price}</p>
                    <div class="quantity-control">
                        <button class="btn btn-outline-success" onclick="changeQuantity('${medicine.name}', ${medicine.price}, -1)">-</button>
                        <span id="quantity-${medicine.name}">0</span>
                        <button class="btn btn-outline-success" onclick="changeQuantity('${medicine.name}', ${medicine.price}, 1)">+</button>
                    </div>
                `;
                medicineItemsContainer.appendChild(div);
            });
    
            categorySection.appendChild(medicineItemsContainer);
            medicineListDiv.appendChild(categorySection);
        }
    }

    function changeQuantity(medicineName, price, delta) {
        let foundMedicine = null;
        for (const category in medicines) {
            foundMedicine = medicines[category].find(medicine => medicine.name === medicineName);
            if (foundMedicine) break;
        }
    
        if (!foundMedicine) return;
    
        foundMedicine.quantity = Math.max(0, foundMedicine.quantity + delta); 
        document.getElementById(`quantity-${medicineName}`).textContent = foundMedicine.quantity;
    
        if (foundMedicine.quantity > 0) {
            addToCart(medicineName, price, foundMedicine.quantity);
        } else {
            removeFromCartByName(medicineName);
        }
    }
    //search medicines
    function displayFilteredMedicines(searchQuery) {
        const medicineListDiv = document.querySelector('.medicine-list');
        medicineListDiv.innerHTML = ''; 
        for (const category in medicines) {
            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';
            categorySection.innerHTML = `<h2>${category}</h2>`;

            const medicineItemsContainer = document.createElement('div');
            medicineItemsContainer.className = 'medicine-items'; 

            medicines[category].forEach(medicine => {
                if (medicine.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    const div = document.createElement('div');
                    div.className = 'medicine-item';
                    div.innerHTML = `
                        <h3>${medicine.name}</h3>
                        <p>Composition: ${medicine.composition}</p>
                        <p>${medicine.volume}</p>
                        <p>Price: ₹ ${medicine.price}</p>
                        <div class="quantity-control">
                            <button class="btn btn-outline-success" onclick="changeQuantity('${medicine.name}', ${medicine.price}, -1)">-</button>
                            <span id="quantity-${medicine.name}">0</span>
                            <button class="btn btn-outline-success" onclick="changeQuantity('${medicine.name}', ${medicine.price}, 1)">+</button>
                        </div>
                    `;
                    medicineItemsContainer.appendChild(div);
                }
            });

            if (medicineItemsContainer.children.length > 0) {
                categorySection.appendChild(medicineItemsContainer);
                medicineListDiv.appendChild(categorySection);
            }
        }
    }
    
    let cart = [];
    //show cart
    function addToCart(medicineName, price, quantity) {
        let foundMedicine = null;

        for (const category in medicines) {
            foundMedicine = medicines[category].find(medicine => medicine.name === medicineName);
            if (foundMedicine) break;
        }
        
        if (!foundMedicine) return;
        
        const itemIndex = cart.findIndex(item => item.medicine === medicineName);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = quantity;
        } else {
            cart.push({ 
                medicine: medicineName, 
                price, 
                quantity,
                volume: foundMedicine.volume 
            });
        }
        updateCartItems();
    }
    //show cart
    function displayCartItems() {
        const cartItemsDiv = document.getElementById('cart-items');
        if (!cartItemsDiv) return;
    
        cartItemsDiv.innerHTML = '';

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }
    
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.innerHTML = `
            <thead>
                <tr>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Medicine</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Type</th> 
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Price</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Quantity</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Total</th>
                </tr>
            </thead>
            <tbody id="cart-items-body">
            </tbody>
        `;
        cartItemsDiv.appendChild(table);
    
        const cartItemsBody = document.getElementById('cart-items-body');
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${item.medicine}</td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${item.volume}</td> 
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">₹${item.price}</td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${item.quantity}</td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">₹${item.price * item.quantity}</td>
            `;
            cartItemsBody.appendChild(row);
        });
    }
    
    

    function updateCartItems() {
        localStorage.setItem('cart', JSON.stringify(cart));  
        displayCartItems();  
        updateTotalBill();   
        updateTotalItems();  
    }
    function removeFromCartByName(medicineName) {
        cart = cart.filter(item => item.medicine !== medicineName);
        updateCartItems();  
    }
    function loadCartItems() {
        const cartItems = localStorage.getItem('cart');
        cart = cartItems ? JSON.parse(cartItems) : [];
        displayCartItems();
        updateTotalBill(); 
        updateTotalItems(); 
    }
    function updateTotalBill() {
        let totalBill = 0;
    
        cart.forEach(item => {
            totalBill += item.price * item.quantity;
        });
    
        document.getElementById('total-bill').textContent = `Total Bill: ₹ ${totalBill}`;
    }
    function updateTotalItems() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('total-items').textContent = `Total Items: ${totalItems}`;
    }
    function emptyCart() {
        cart = []; 
        localStorage.removeItem('cart'); 
    
        
        for (const category in medicines) {
            medicines[category].forEach(medicine => {
                medicine.quantity = 0;
                const quantityElement = document.getElementById(`quantity-${medicine.name}`);
                if (quantityElement) {
                    quantityElement.textContent = medicine.quantity;
                }
            });
        }
    
        displayCartItems();
        updateTotalBill();  
        updateTotalItems(); 
    }

    function proceedToBooking() {
        window.location.href = 'order.html';
    }    
    //display order preview
    function displayOrderSummary() {
        const orderSummaryDiv = document.getElementById('order-summary'); 
        orderSummaryDiv.innerHTML = ''; 

        const storedCart = localStorage.getItem('cart');
        const cart = storedCart ? JSON.parse(storedCart) : [];

        if (cart.length === 0) {
            orderSummaryDiv.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.innerHTML = `
            <thead>
                <tr>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Medicine</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Type</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Price</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Quantity</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Total</th>
                </tr>
            </thead>
            <tbody id="order-summary-items">
            </tbody>
        `;
        orderSummaryDiv.appendChild(table);

        const orderSummaryItems = document.getElementById('order-summary-items');
        let total = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${item.medicine}</td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${item.volume}</td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">₹${item.price}</td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${item.quantity}</td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">₹${item.price * item.quantity}</td>
            `;
            orderSummaryItems.appendChild(row);
            total += item.price * item.quantity;
        });

        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="4" style="padding: 8px; border: 1px solid #ddd; background-color: #fff; text-align: right;"><strong>Total Bill:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>₹${total}</strong></td>
            
        `;
        orderSummaryItems.appendChild(totalRow);
        const additionalRow = document.createElement('tr');
        additionalRow.innerHTML = `
        <td colspan="5" style="padding: 8px; border: 1px solid #ddd; background-color: #fff; text-align: left;">
        *Get 15% discount on Total Bill when order!!
        </td>
        `;

        
        orderSummaryItems.appendChild(additionalRow);

        updateTotalBill();
        updateTotalItems();
    }

    document.getElementById('delivery').addEventListener('change', populateSlotTimes);

function populateSlotTimes() {
    const slotTimeSelect = document.getElementById('slot-time');
    const deliveryType = document.getElementById('delivery').value;

    if (!slotTimeSelect) {
        console.error('Slot-time select element not found');
        return;
    }

    slotTimeSelect.innerHTML = '';

    const now = new Date();
    const currentHour = now.getHours();

    if (deliveryType === 'Store Pickup') {

        const todaySlot = getTodaySlot(currentHour);
        const tomorrowSlot = '10:00 AM - 9:00 PM';

        if (todaySlot) {
            const todayOption = document.createElement('option');
            todayOption.value = todaySlot;
            const Today = new Date(now);
            Today.setDate(now.getDate());
            const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDateToday = Today.toLocaleDateString('en-US', options);
            todayOption.textContent = `${todaySlot} | ${formattedDateToday}`;
            slotTimeSelect.appendChild(todayOption);
        }
        
        const tomorrowOption = document.createElement('option');
        tomorrowOption.value = tomorrowSlot;
        const Tomorrow = new Date(now);
        Tomorrow.setDate(now.getDate() + 1);
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDateTomorrow = Tomorrow.toLocaleDateString('en-US', options);
        tomorrowOption.textContent = `${tomorrowSlot} | ${formattedDateTomorrow}`;
        slotTimeSelect.appendChild(tomorrowOption);

    } else {
        const dayAfterTomorrow = new Date(now);
    dayAfterTomorrow.setDate(now.getDate() + 1);

    const twoDaysAfterTomorrow = new Date(now);
    twoDaysAfterTomorrow.setDate(now.getDate() + 2);

    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate1 = dayAfterTomorrow.toLocaleDateString('en-US', options);
    const formattedDate2 = twoDaysAfterTomorrow.toLocaleDateString('en-US', options);

    const slotTimes = [
        '9:00 AM - 12:00 PM',
        '5:00 PM - 8:00 PM'
    ];

    [formattedDate1, formattedDate2].forEach(formattedDate => {
    slotTimes.forEach(slot => {
        const option = document.createElement('option');
        option.value = `${slot} | ${formattedDate}`;
        option.textContent = `${slot} | ${formattedDate}`;
        slotTimeSelect.appendChild(option);
    });
    });
    }
}
function getTodaySlot(currentHour) {
    if (currentHour < 10) {
        return '10:00 AM - 9:00 PM'; 
    } else if (currentHour < 20) {
        const nextHour = currentHour + 1;
        return `${formatHour(nextHour)} - 9:00 PM`; 
    }
    return null;
}
function formatHour(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour} ${period}`;
}


populateSlotTimes();



document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    displayReceipt(); 
});
function displayReceipt() {
        const name = document.getElementById('customer-name').value;
        const phone = document.getElementById('customer-phone').value;
        const address = document.getElementById('customer-address').value;
        const payment = document.getElementById('payment').value;
        const delivery = document.getElementById('delivery').value;
        const slotTime = document.getElementById('slot-time').value;

        let deliveryCharge = 0;
        if (delivery === 'Home Delivery') {
            deliveryCharge = 20;  
        }

        const totalBill = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const discount = Math.round(totalBill * 0.15);
        const payBill = totalBill-discount+deliveryCharge;
    
        //receipt content
        const receiptContent = document.getElementById('receipt-content');
        receiptContent.innerHTML = `<div class="receipt-form-download" id="receipt-form-download" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc;  background-color: #fff">
        <div style="text-align: center; font-size: 2.5rem; color: hwb(216 25% 19%);">
            <i class="fa-solid fa-stethoscope"> CliniCare </i>
        </div>
        <h3 style="text-align: center; margin-top: 30px;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>Name:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${name}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>Phone:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${phone}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>Address:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${address}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>Payment Mode:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${payment}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>Delivery Mode:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${delivery}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>Time Slot:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${slotTime}</td>
            </tr>
        </table>
        
        <h3 style="text-align: center; margin-top: 30px;">Medicine Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
                <tr>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Medicine</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Type</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Price</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Quantity</th>
                    <th style="padding: 8px; border: 1px solid #ddd; background-color: #fff;">Total</th>
                </tr>
            </thead>
            <tbody id="order-items">
            </tbody>
        </table>
        </div>
    `;

    const orderItemsTable = document.getElementById('order-items');
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${item.medicine}</td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${item.volume}</td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">₹${item.price}</td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">${item.quantity}</td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff">₹ ${item.price * item.quantity}</td>
        `;
        orderItemsTable.appendChild(row);
    });

        const totalBillRow = document.createElement('tr');
        totalBillRow.innerHTML = `
            <td colspan="4" style="padding: 8px; border: 1px solid #ddd; background-color: #fff; text-align: right;"><strong>Total Bill:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>₹ ${totalBill}</strong></td>
        `;
        orderItemsTable.appendChild(totalBillRow);

        const discountRow = document.createElement('tr');
        discountRow.innerHTML = `
            <td colspan="4" style="padding: 8px; border: 1px solid #ddd; background-color: #fff; text-align: right;"><strong>Discount:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>₹ ${discount}</strong></td>
        `;
        orderItemsTable.appendChild(discountRow);

        const deliveryRow = document.createElement('tr');
        deliveryRow.innerHTML = `
            <td colspan="4" style="padding: 8px; border: 1px solid #ddd; background-color: #fff; text-align: right;"><strong>Delivery Charges:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>₹ ${deliveryCharge}</strong></td>
        `;
        orderItemsTable.appendChild(deliveryRow);

        const payBillRow = document.createElement('tr');
        payBillRow.innerHTML = `
            <td colspan="4" style="padding: 8px; border: 1px solid #ddd; background-color: #fff; text-align: right;"><strong>Payable Amount:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #fff"><strong>₹ ${payBill}</strong></td>
        `;
        orderItemsTable.appendChild(payBillRow);

    // Show the receipt
        document.getElementById('receipt-section').style.display = 'block';
        document.getElementById('download-receipt').style.display = 'block';

        emptyCart();
    }
    
    document.getElementById('download-receipt').addEventListener('click', function() {
        const receiptSection = document.getElementById('receipt-section');
        const name = document.getElementById('customer-name').value;
        html2canvas(receiptSection).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            const id = generateNumberFromDateTime();
            link.download = `${id}_MedReceipt_${name}.png`;
            link.click();
        })
    });
    
    
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

    
    window.onload = () => {
        loadCartItems();  
        populateSlotTimes();
        displayOrderSummary();
    
        if (medicineList) {
            displayMedicines();  
        }
    
        if (orderSummaryDetails) {
            displayOrderSummary();  
        }
    };