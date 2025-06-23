(function() {
    // Wait for DOM and EmailJS SDK to load
    window.addEventListener('load', function() {
        console.log('Initializing EmailJS...');
        
        try {
            // Initialize EmailJS with your public key
            emailjs.init("rFqljG0KrIZpT50qe");
            console.log('EmailJS initialized successfully');
        } catch (error) {
            console.error('Error initializing EmailJS:', error);
            // Show error message if initialization fails
            const errorAlert = document.getElementById('errorAlert');
            if (errorAlert) {
                errorAlert.textContent = 'Failed to initialize email service. Please try again later.';
                errorAlert.style.display = 'block';
            }
            return;
        }
        
        // Get the form and alert elements
        const form = document.getElementById('contactForm');
        const successAlert = document.getElementById('successAlert');
        const errorAlert = document.getElementById('errorAlert');
        
        // Function to show an alert
        function showAlert(element, message = null, duration = 5000) {
            if (message) {
                element.textContent = message;
            }
            element.style.display = 'block';
            setTimeout(() => {
                element.style.display = 'none';
            }, duration);
        }
        
        if (form) {
            console.log('Contact form found and ready');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Form submitted, preparing to send email...');
                
                // Get form field values
                const formData = {
                    from_name: form.querySelector('#name').value,
                    reply_to: form.querySelector('#email').value,
                    subject: form.querySelector('#subject').value,
                    message: form.querySelector('#message').value
                };
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.reply_to)) {
                    showAlert(errorAlert, 'Please enter a valid email address.');
                    return;
                }
                
                // Hide any existing alerts
                successAlert.style.display = 'none';
                errorAlert.style.display = 'none';
                
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending...';

                // Log form data (excluding sensitive information)
                console.log('Sending email with data:', {
                    from_name: formData.from_name,
                    subject: formData.subject
                });
                console.log('Using service ID:', 'service_gy5rvs6');
                console.log('Using template ID:', 'template_aernxr4');

                // Send the email using EmailJS
                emailjs.sendForm('service_gy5rvs6', 'template_aernxr4', form)
                    .then(function(response) {
                        console.log('Email sent successfully! Response:', response);
                        form.reset();
                        showAlert(successAlert);
                    })
                    .catch(function(error) {
                        console.error('EmailJS error details:', {
                            message: error.message,
                            name: error.name,
                            text: error.text,
                            stack: error.stack
                        });
                        
                        // Show a more specific error message based on the error
                        let errorMessage = 'Sorry, there was an error sending your message. ';
                        if (error.text) {
                            errorMessage += error.text;
                        } else if (error.message) {
                            errorMessage += error.message;
                        }
                        showAlert(errorAlert, errorMessage);
                    })
                    .finally(function() {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                        console.log('Email sending process completed');
                    });
            });
        } else {
            console.error('Contact form element not found!');
        }
    });
})();
