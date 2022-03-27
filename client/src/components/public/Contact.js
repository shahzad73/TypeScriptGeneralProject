import React, { Component } from "react";

export default function Contact() {
  React.useEffect(() => {
      //alert("Hello");

      return () => {
          //alert("Bye");
      };

  }, []);


  return (  
    <div>
            <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
                <div class="container text-center text-md-left" data-aos="fade-up">
                <h1>Welcome to <span>iNFTMaker</span></h1>
                <h2>We are team of talented designers making websites with Bootstrap</h2>
                <a href="#about" class="btn-get-started scrollto">Get Started</a>
                </div>
            </section>

            <section id="contact" class="contact section-bg">
                <div class="container">

                    <div class="section-title">
                    <h2>Contact</h2>
                    <p>Magnam dolores commodi suscipit eius consequatur ex aliquid fuga</p>
                    </div>

                    <div class="row mt-5 justify-content-center">

                    <div class="col-lg-10">

                        <div class="info-wrap">
                        <div class="row">
                            <div class="col-lg-4 info">
                            <i class="bi bi-geo-alt"></i>
                            <h4>Location:</h4>
                            <p>A108 Adam Street<br />New York, NY 535022</p>
                            </div>

                            <div class="col-lg-4 info mt-4 mt-lg-0">
                            <i class="bi bi-envelope"></i>
                            <h4>Email:</h4>
                            <p>info@example.com<br />contact@example.com</p>
                            </div>

                            <div class="col-lg-4 info mt-4 mt-lg-0">
                            <i class="bi bi-phone"></i>
                            <h4>Call:</h4>
                            <p>+1 5589 55488 51<br />+1 5589 22475 14</p>
                            </div>
                        </div>
                        </div>

                    </div>

                    </div>

                    <div class="row mt-5 justify-content-center">
                    <div class="col-lg-10">
                        <form action="forms/contact.php" method="post" role="form" class="php-email-form">
                        <div class="row">
                            <div class="col-md-6 form-group">
                            <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required />
                            </div>
                            <div class="col-md-6 form-group mt-3 mt-md-0">
                            <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required />
                            </div>
                        </div>
                        <div class="form-group mt-3">
                            <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required />
                        </div>
                        <div class="form-group mt-3">
                            <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                        </div>
                        <div class="my-3">
                            <div class="loading">Loading</div>
                            <div class="error-message"></div>
                            <div class="sent-message">Your message has been sent. Thank you!</div>
                        </div>
                        <div class="text-center"><button type="submit">Send Message</button></div>
                        </form>
                    </div>

                    </div>

                </div>
                </section>

    </div>
  );    
}