---
title: Contact
icon: fas fa-envelope
order: 5
---

# Get in Touch

<!-- EmailJS SDK -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

<div class="contact-form">
  <div id="successAlert" class="alert alert-success" style="display: none;" role="alert">
    Thank you! Your message has been sent successfully.
  </div>
  <div id="errorAlert" class="alert alert-danger" style="display: none;" role="alert">
    Oops! Something went wrong. Please try again later.
  </div>

  <form id="contactForm">
    <div class="form-group mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" name="from_name" required>
    </div>

    <div class="form-group mb-3">
      <label for="email" class="form-label">Email Address</label>
      <input type="email" class="form-control" id="email" name="reply_to" required>
    </div>

    <div class="form-group mb-3">
      <label for="subject" class="form-label">Subject</label>
      <input type="text" class="form-control" id="subject" name="subject" required>
    </div>

    <div class="form-group mb-3">
      <label for="message" class="form-label">Message</label>
      <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Send Message</button>
  </form>
</div>

<!-- Contact form JavaScript -->
<script src="{{ '/assets/js/contact-form.js' | relative_url }}"></script>

<style>
.alert {
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.contact-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
