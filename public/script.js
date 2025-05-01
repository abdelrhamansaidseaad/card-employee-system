function showMessage(message, isError = false) {
    const messageDiv = document.getElementById('responseMessage');
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'message error' : 'message success';
    setTimeout(() => messageDiv.textContent = '', 5000);
}

document.getElementById('createCardForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const card = {
        cardNumber: document.getElementById('cardNumber').value,
        holderName: document.getElementById('holderName').value,
        balance: parseFloat(document.getElementById('balance').value),
        expiryDate: document.getElementById('expiryDate').value
    };

    try {
        const response = await fetch('/api/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card)
        });

        const data = await response.json();
        
        if (response.ok) {
            showMessage('تم إنشاء البطاقة بنجاح');
            loadCards();
        } else {
            showMessage(data.error || 'حدث خطأ أثناء إنشاء البطاقة', true);
        }
    } catch (error) {
        showMessage('حدث خطأ في الاتصال بالخادم', true);
    }
});

document.getElementById('withdrawForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const withdrawData = {
        cardNumber: document.getElementById('withdrawCardNumber').value,
        amount: parseFloat(document.getElementById('amount').value)
    };

    try {
        const response = await fetch(`/api/cards/${withdrawData.cardNumber}/withdraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: withdrawData.amount })
        });

        const data = await response.json();
        
        if (response.ok) {
            showMessage(`تم السحب بنجاح. الرصيد الجديد: ${data.newBalance}`);
            loadCards();
        } else {
            showMessage(data.error || 'حدث خطأ أثناء السحب', true);
        }
    } catch (error) {
        showMessage('حدث خطأ في الاتصال بالخادم', true);
    }
});

document.getElementById('createEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const employee = {
        employeeId: document.getElementById('employeeId').value,
        name: document.getElementById('employeeName').value,
        permissions: document.getElementById('permissions').value.split(',').map(p => p.trim())
    };

    try {
        const response = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });

        const data = await response.json();
        
        if (response.ok) {
            showMessage('تم إضافة الموظف بنجاح');
            loadEmployees();
        } else {
            showMessage(data.error || 'حدث خطأ أثناء إضافة الموظف', true);
        }
    } catch (error) {
        showMessage('حدث خطأ في الاتصال بالخادم', true);
    }
});

async function loadCards() {
    try {
        const response = await fetch('/api/cards');
        const cards = await response.json();
        
        const cardsList = document.getElementById('cardsList');
        cardsList.innerHTML = '<h2>البطاقات</h2>';
        
        cards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `
                <p><strong>رقم البطاقة:</strong> ${card.cardNumber}</p>
                <p><strong>اسم الحامل:</strong> ${card.holderName}</p>
                <p><strong>الرصيد:</strong> ${card.balance}</p>
                <p><strong>تاريخ الانتهاء:</strong> ${new Date(card.expiryDate).toLocaleDateString()}</p>
            `;
            cardsList.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Error loading cards:', error);
    }
}

async function loadEmployees() {
    try {
        const response = await fetch('/api/employees');
        const employees = await response.json();
        
        const employeesList = document.getElementById('employeesList');
        employeesList.innerHTML = '<h2>الموظفين</h2>';
        
        employees.forEach(employee => {
            const empDiv = document.createElement('div');
            empDiv.className = 'employee';
            empDiv.innerHTML = `
                <p><strong>رقم الموظف:</strong> ${employee.employeeId}</p>
                <p><strong>الاسم:</strong> ${employee.name}</p>
                <p><strong>الصلاحيات:</strong> ${employee.permissions.join(', ')}</p>
            `;
            employeesList.appendChild(empDiv);
        });
    } catch (error) {
        console.error('Error loading employees:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadCards();
    loadEmployees();
});