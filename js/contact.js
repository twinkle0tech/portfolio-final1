// Inside your DOMContentLoaded event
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('Please fill in all fields');
                return;
            }

            const response = await fetch('http://localhost/portfolio/api.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Server error');
            }

            const result = await response.json();
            alert(result.message || 'Message sent successfully!');
            contactForm.reset();
            
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Error: ${error.message}\n\nPlease:\n1. Check your internet connection\n2. Ensure the server is running\n3. Try again later`);
        }
    });
}