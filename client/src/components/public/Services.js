import React, { Component } from "react";

export default function Services() {
  React.useEffect(() => {
      //alert("Hello");

      return () => {
          //alert("Bye");
      };

  }, []);


  return (  
    <div>

            <section id="contact" class="contact section-bg">
                <div class="container">
                    <br /><br />
                    <div class="section-title">
                    <h2>Services</h2>
                    <p>Magnam dolores commodi suscipit eius consequatur ex aliquid fuga</p>
                    </div>

                    <div class="row mt-5 justify-content-center">

                        <div class="col-lg-10">

                            <div class="info-wrap">
                            <div class="row">
                                <div class="col-lg-4 info">
                                <i class="bi bi-geo-alt"></i>
                                <h4>Services:</h4>
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

                </div>
                </section>

    </div>
  );    
}