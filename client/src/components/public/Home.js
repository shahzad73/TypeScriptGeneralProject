import React, { Component } from "react";

export default function Dashboard() {
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

            <main id="main">

                <section id="what-we-do" class="what-we-do">
                <div class="container">

                    <div class="section-title">
                    <h2>What We Do</h2>
                    <p>Magnam dolores commodi suscipit consequatur ex aliquid</p>
                    </div>

                    <div class="row">
                        
                        <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
                            <div class="icon-box"><div class="icon"><i class="bx bxl-dribbble"></i></div>
                                <h4><a href="#">Lorem Ipsum</a></h4>
                                <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                            <div class="icon-box">
                            <div class="icon"><i class="bx bx-file"></i></div>
                            <h4><a href="#">Sed ut perspiciatis</a></h4>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                            <div class="icon-box">
                            <div class="icon"><i class="bx bx-tachometer"></i></div>
                            <h4><a href="#">Magni Dolores</a></h4>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                            </div>
                        </div>

                    </div>

                </div>
                </section>

                <section id="about" class="about">
                <div class="container">

                    <div class="row">
                    <div class="col-lg-6">
                        <img src="website/img/about.jpg" class="img-fluid" alt="" />
                    </div>
                    <div class="col-lg-6 pt-4 pt-lg-0">
                        <h3>About Us</h3>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <ul>
                        <li><i class="bx bx-check-double"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                        <li><i class="bx bx-check-double"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                        </ul>
                        <div class="row icon-boxes">
                        <div class="col-md-6">
                            <i class="bx bx-receipt"></i>
                            <h4>Corporis voluptates sit</h4>
                            <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                        </div>
                        <div class="col-md-6 mt-4 mt-md-0">
                            <i class="bx bx-cube-alt"></i>
                            <h4>Ullamco laboris nisi</h4>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
                </section>

                <section id="skills" class="skills">
                <div class="container">

                    <div class="row skills-content">

                    <div class="col-lg-6">

                        <div class="progress">
                        <span class="skill">HTML <i class="val">100%</i></span>
                        <div class="progress-bar-wrap">
                            <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        </div>

                        <div class="progress">
                        <span class="skill">CSS <i class="val">90%</i></span>
                        <div class="progress-bar-wrap">
                            <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        </div>

                        <div class="progress">
                        <span class="skill">JavaScript <i class="val">75%</i></span>
                        <div class="progress-bar-wrap">
                            <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        </div>

                    </div>

                    <div class="col-lg-6">

                        <div class="progress">
                        <span class="skill">PHP <i class="val">80%</i></span>
                        <div class="progress-bar-wrap">
                            <div class="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        </div>

                        <div class="progress">
                        <span class="skill">WordPress/CMS <i class="val">90%</i></span>
                        <div class="progress-bar-wrap">
                            <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        </div>

                        <div class="progress">
                        <span class="skill">Photoshop <i class="val">55%</i></span>
                        <div class="progress-bar-wrap">
                            <div class="progress-bar" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        </div>

                    </div>

                    </div>

                </div>
                </section>

                <section id="counts" class="counts">
                <div class="container">

                    <div class="row">

                    <div class="col-lg-3 col-6">
                        <div class="count-box">
                        <i class="bi bi-emoji-smile"></i>
                        <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
                        <p>Happy Clients</p>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">
                        <div class="count-box">
                        <i class="bi bi-journal-richtext"></i>
                        <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" class="purecounter"></span>
                        <p>Projects</p>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6 mt-5 mt-lg-0">
                        <div class="count-box">
                        <i class="bi bi-headset"></i>
                        <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" class="purecounter"></span>
                        <p>Hours Of Support</p>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6 mt-5 mt-lg-0">
                        <div class="count-box">
                        <i class="bi bi-people"></i>
                        <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" class="purecounter"></span>
                        <p>Hard Workers</p>
                        </div>
                    </div>

                    </div>

                </div>
                </section>

                <section id="services" class="services section-bg">
                <div class="container">

                    <div class="section-title">
                    <h2>Services</h2>
                    <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem</p>
                    </div>

                    <div class="row">
                    <div class="col-md-6">
                        <div class="icon-box">
                        <i class="bi bi-briefcase"></i>
                        <h4><a href="#">Lorem Ipsum</a></h4>
                        <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                        </div>
                    </div>
                    <div class="col-md-6 mt-4 mt-lg-0">
                        <div class="icon-box">
                        <i class="bi bi-card-checklist"></i>
                        <h4><a href="#">Dolor Sitema</a></h4>
                        <p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
                        </div>
                    </div>
                    <div class="col-md-6 mt-4">
                        <div class="icon-box">
                        <i class="bi bi-bar-chart"></i>
                        <h4><a href="#">Sed ut perspiciatis</a></h4>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                        </div>
                    </div>
                    <div class="col-md-6 mt-4">
                        <div class="icon-box">
                        <i class="bi bi-binoculars"></i>
                        <h4><a href="#">Nemo Enim</a></h4>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        </div>
                    </div>
                    <div class="col-md-6 mt-4">
                        <div class="icon-box">
                        <i class="bi bi-brightness-high"></i>
                        <h4><a href="#">Magni Dolore</a></h4>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                        </div>
                    </div>
                    <div class="col-md-6 mt-4">
                        <div class="icon-box">
                        <i class="bi bi-calendar4-week"></i>
                        <h4><a href="#">Eiusmod Tempor</a></h4>
                        <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
                        </div>
                    </div>
                    </div>

                </div>
                </section>

            </main>

    </div>
  );    
}
