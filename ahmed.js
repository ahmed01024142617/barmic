// السهم
const backToTop = document.getElementById('backToTop');

window.onscroll = function() {
    // إظهار السهم عند التمرير خطوة واحدة (1px)
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
};

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

    // التقييم
document.addEventListener('DOMContentLoaded', function() {
            const stars = document.querySelectorAll('.star');
            const ratingText = document.getElementById('rating-text');

            const texts = {
                1: 'سيء <i class="fa fa-frown emoji"></i>',
                2: 'مقبول <i class="fa fa-meh emoji"></i>',
                3: 'جيد <i class="fa fa-smile emoji"></i>',
                4: 'جيد جداً <i class="fa fa-grin emoji"></i>',
                5: 'ممتاز <i class="fa fa-grin-stars emoji"></i>'
            };

            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const value = this.getAttribute('data-value');
                    stars.forEach(s => s.classList.remove('selected'));
                    for (let i = 0; i < value; i++) {
                        stars[i].classList.add('selected');
                    }
                    ratingText.innerHTML = texts[value];
                });
            });
        });
// sidbar

function showsidebar() {
    const sidbar = document.querySelector('.sidbar')
    sidbar.style.display='flex'
}
function hiddensidebar() {
        const sidbar = document.querySelector('.sidbar')
    sidbar.style.display='none'
}

// الوزن
function validateWeight(input) {
    input.value = input.value.replace(/[^0-9]/g, '');

    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
    }

    if (/[^0-9]/.test(input.value) || input.value === '') {
        input.style.borderColor = 'red'; 
    } else {
        input.style.borderColor = ''; 
    }
    }

    document.getElementById('weight').addEventListener('input', function() {
    validateWeight(this);
    });
// الطول
function validateheight(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
    }

    if (/[^0-9]/.test(input.value) || input.value === '') {
        input.style.borderColor = 'red'; 
    } else {
        input.style.borderColor = '';
    }
    }

    document.getElementById('height').addEventListener('input', function() {
    validateheight(this);
    });

// زرار التقيم
document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");
    const submitButton = document.querySelector(".send");
    let rating = 0;

    stars.forEach(star => {
        star.addEventListener("click", function() {
            rating = this.getAttribute("data-value");
            updateStars(rating);
            submitButton.disabled = false;  // Enable the submit button
        });
    });

    function updateStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute("data-value") <= rating) {
                star.classList.add("selected");
            } else {
                star.classList.remove("selected");
            }
        });
    }

    const form = document.getElementById("myForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent the default form submission
        window.scrollTo(0, 0);   // Scroll to the top of the page
        location.reload();       // Reload the page
    });
});

//ال +
let total = 0;

function checkFormFilled() {
    const weight = document.getElementById('weight').value.trim();
    const height = document.getElementById('height').value.trim();
    const processItems = document.querySelectorAll('.process-item');
    let allFieldsValid = true;

    processItems.forEach(item => {
        const sizeSelect = item.querySelector('.size-select');
        const quantityInputs = item.querySelectorAll('.quantity-item select[id^="quantity-input-"]');
        const winterInputs = item.querySelectorAll('.quantity-item select[id^="winter-quantity-"]');
        const summerInputs = item.querySelectorAll('.quantity-item select[id^="summer-quantity-"]');

        if (!sizeSelect.value) {
            allFieldsValid = false;
        }

        quantityInputs.forEach(input => {
            if (!input.value) {
                allFieldsValid = false;
            }
        });

        winterInputs.forEach(input => {
            if (!input.value) {
                allFieldsValid = false;
            }
        });

        summerInputs.forEach(input => {
            if (!input.value) {
                allFieldsValid = false;
            }
        });
    });

    document.getElementById('buy-now-btn').disabled = !allFieldsValid;
    document.getElementById('rent-now-btn').disabled = !allFieldsValid;
}

function displayOptions(selectElement) {
    const optionsDiv = selectElement.parentElement.querySelector('.options-container');
    const selectedSize = selectElement.value;

    if (selectedSize) {
        optionsDiv.style.display = 'block';
        total = 185; // تعيين المجموع إلى 185 عند اختيار المقاس
        updateTotalDisplay(); // تحديث عرض المجموع
    } else {
        optionsDiv.style.display = 'none';
    }
    checkFormFilled();
}

function createProcess() {
    const processContainer = document.getElementById('process-container');
    const processCount = document.querySelectorAll('.process-item').length;
    const weight = document.getElementById('weight').value.trim();
    const height = document.getElementById('height').value.trim();

    if (!weight || !height) {
        alert('يرجى إدخال الوزن والطول قبل إضافة المقاسات.');
        return;
    }

    const newProcess = document.createElement('div');
    newProcess.className = 'process-item';
    newProcess.innerHTML = `
        <label for="size-${processCount}">المقاس</label>
        <select id="size-${processCount}" class="size-select" onchange="displayOptions(this); createSizeOptions(${processCount}); checkFormFilled();">
            <option value="">اختار</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">XL</option>
            <option value="2xl">2XL</option>
            <option value="3xl">3XL</option>
            <option value="4xl">4XL</option>
            <option value="5xl">5XL</option>
            <option value="6xl">6XL</option>
            <option value="7xl">7XL</option>
            <option value="8xl">8XL</option>
        </select>
        <button type="button" onclick="createProcess()" class="btn2">+</button>

        <div class="options-container" style="display: none;">
            <form action="">
                <div id="quantity-group-${processCount}" class="quantity-group"></div>
            </form>
        </div>
    `;
    processContainer.appendChild(newProcess);

    total += 185; // زيادة المجموع بمقدار 185 عند الضغط على زر +
    updateTotalDisplay(); // تحديث عرض المجموع
    checkFormFilled();
}

function createSizeOptions(processCount) {
    const selectedSize = document.getElementById(`size-${processCount}`).value;
    const quantityGroup = document.getElementById(`quantity-group-${processCount}`);
    quantityGroup.innerHTML = ''; // مسح الخيارات السابقة

    if (selectedSize) {
        quantityGroup.innerHTML = `
            <div class="quantity-item">
                <label for="quantity-input-${processCount}">كمية ${selectedSize}</label>
                <select id="quantity-input-${processCount}" class="custom-input" onchange="updateQuantities(${processCount}); checkQuantities(${processCount}); checkFormFilled();">
                    ${generateOptions(1, 30)}
                </select>
            </div>
            <div class="quantity-item">
                <label for="winter-quantity-${processCount}">كمية الشتوي ${selectedSize}</label>
                <select id="winter-quantity-${processCount}" class="custom-input" onchange="updateQuantities(${processCount}); checkQuantities(${processCount}); checkFormFilled();">
                    ${generateOptions(0, 30)}
                </select>
            </div>
            <div class="quantity-item">
                <label for="summer-quantity-${processCount}">كمية الصيفي ${selectedSize}</label>
                <select id="summer-quantity-${processCount}" class="custom-input" onchange="checkQuantities(${processCount}); checkFormFilled();">
                    ${generateOptions(0, 30)}
                </select>
            </div>
        `;
        updateTotalDisplay(); // تحديث عرض المجموع
    }
    checkFormFilled();
}

function generateOptions(min, max) {
    let options = '';
    for (let i = min; i <= max; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    return options;
}

function updateQuantities(processCount) {
    const quantity = parseInt(document.getElementById(`quantity-input-${processCount}`).value) || 0;
    const winterQuantity = parseInt(document.getElementById(`winter-quantity-${processCount}`).value) || 0;

    // حساب الزيادة بناءً على الكمية
    const extraAmount = (quantity - 1) * 185 + (winterQuantity * 10);
    
    // تحديث المجموع
    total = 185 + extraAmount;
    updateTotalDisplay(); // تحديث عرض المجموع
}

function updateTotalDisplay() {
    document.getElementById('total-display').textContent = `المجموع: ${total}`;
}

function checkQuantities(processCount) {
    const totalQuantity = parseInt(document.getElementById(`quantity-input-${processCount}`).value) || 0;
    const winterQuantity = parseInt(document.getElementById(`winter-quantity-${processCount}`).value) || 0;
    const summerQuantity = parseInt(document.getElementById(`summer-quantity-${processCount}`).value) || 0;

    if (winterQuantity + summerQuantity > totalQuantity) {
        alert('مجموع كميات الصيفي والشتوي لا يمكن أن يتجاوز الكمية الإجمالية.');
        document.getElementById(`winter-quantity-${processCount}`).value = 0;
        document.getElementById(`summer-quantity-${processCount}`).value = 0;
    }
}

function handleBuyNow(event) {
    if (!document.getElementById('buy-now-btn').disabled) {
        event.preventDefault();
        window.location.href = 'purchase.html';
    }
}

function handleRentNow(event) {
    if (!document.getElementById('rent-now-btn').disabled) {
        event.preventDefault();
        window.location.href = 'time.html';
    }
}

//تغيير الصورة لما اختار مقاس مختلف 
document.getElementById('size-0').addEventListener('change', function () {
            changeImage();
        });

        function changeImage() {
            var selectedSize = document.getElementById('size-0').value;
            var imageUrl;

            switch(selectedSize) {
                case 'small':
                    imageUrl = 'real.icon.png';
                    break;
                case 'medium':
                    imageUrl = '.pics.2013.MyEgY.com.Merna (364).jpg';
                    break;
                case 'large':
                    imageUrl = 'apple_46-wallpaper-1920x1080.jpg';
                    break;
                case 'xl':
                    imageUrl = '.pics.2013.MyEgY.com.Merna (27) - Copy.jpg';
                    break;
                case '2xl':
                    imageUrl = '.pics.2013.MyEgY.com.Merna (179) - Copy.jpg';
                    break;
                case '3xl':
                    imageUrl = '.pics.2013.MyEgY.com.Merna (297) - Copy.jpg';
                    break;
                case '4xl':
                    imageUrl = '.pics.2013.MyEgY.com.Merna (334) - Copy.jpg';
                    break;
                case '5xl':
                    imageUrl = '.pics.2013.MyEgY.com.Merna (359) - Copy.jpg';
                    break;
                case '6xl':
                    imageUrl = '.pics.2013.MyEgY.com.Merna (364).jpg';
                    break;
                case '7xl':
                    imageUrl = '.pics.2013.MyEgY.com.Merna (388) - Copy.jpg';
                    break;
                case '8xl':
                    imageUrl = '38083974-nice-wallpaper-hd - Copy.jpg';
                    break;
                default:
                    imageUrl = 'original_image_url_here.jpg';
            }

            document.getElementById('change').src = imageUrl;
        }
//زر اقرا المزيد 
function toggleText() {
    var fullText = document.getElementById("full-about");
    var button = document.getElementById("read-more-btn");
    if (fullText.style.display === "none" || fullText.style.display === "") {
        fullText.style.display = "block";
        button.textContent = "اقرأ أقل";
    } else {
        fullText.style.display = "none";
        button.textContent = "اقرأ المزيد";
    }
}
//زر ارسال في التواصل
document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('messageInput');
    const submitButton = document.getElementById('now');

    messageInput.addEventListener('input', function () {
        if (messageInput.value.length >= 3) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    });

    // عند النقر على زر الإرسال
    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // منع السلوك الافتراضي
        window.scrollTo(0, 0); // النقل إلى الأعلى
        location.reload(); // إعادة تحميل الصفحة
    });
});

