import React from 'react';

function Main() {
    return (
        <div class="main main-raised">
            <div class="section section-basic">
                <div class="container">
                    <div id="buttons" class="cd-section">
                    <div class="title">
                        <h3>Buttons
                            <br/>
                            <small>Pick your style</small>
                        </h3>
                    </div>
                    <div class="row">
                        <div class="col-md-8 ml-auto mr-auto">
                            <button class="btn btn-primary">Default</button>
                            <button class="btn btn-primary btn-round">Round</button>
                            <button class="btn btn-primary btn-round">
                                <i class="material-icons">favorite</i> With Icon
                            </button>
                            <button class="btn btn-primary btn-fab btn-round">
                                <i class="material-icons">favorite</i>
                            </button>
                            <button class="btn btn-primary btn-link">Simple</button>
                        </div>
                    </div>
                    <div class="title">
                        <h3>
                            <small>Pick your size</small>
                        </h3>
                    </div>
                    <div class="row">
                        <div class="col-md-8 ml-auto mr-auto">
                            <button class="btn btn-primary btn-sm">Small</button>
                            <button class="btn btn-primary">Regular</button>
                            <button class="btn btn-primary btn-lg">Large</button>
                        </div>
                    </div>
                    <div class="title">
                        <h3>
                            <small> Pick your color </small>
                        </h3>
                    </div>
                    <div class="row">
                        <div class="col-md-8 ml-auto mr-auto">
                            <button class="btn">Default</button>
                            <button class="btn btn-primary">Primary</button>
                            <button class="btn btn-info">Info</button>
                            <button class="btn btn-success">Success</button>
                            <button class="btn btn-warning">Warning</button>
                            <button class="btn btn-danger">Danger</button>
                            <button class="btn btn-rose">Rose</button>
                        </div>
                    </div>
                </div>
                    <div class="space-50"></div>
                    <div id="inputs">
                    <div class="title">
                        <h3>Inputs</h3>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-sm-4">
                            <div class="form-group has-default">
                            <label for="exampleInput2" class="bmd-label-floating">:Creep:</label>
                                <input type="text" class="form-control" placeholder="Regular"/>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-4">
                            <div class="form-group">
                                <label for="exampleInput1" class="bmd-label-floating">With Floating Label</label>
                                <input type="email" class="form-control" id="exampleInput1"/>
                                <span class="bmd-help">We'll never share your email with anyone else.</span>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-4">
                            <div class="form-group has-success">
                                <label for="exampleInput2" class="bmd-label-floating">Success input</label>
                                <input type="text" class="form-control" id="exampleInput2"/>
                                <span class="form-control-feedback">
                                    <i class="material-icons">done</i>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-4">
                            <div class="form-group has-danger">
                                <label for="exampleInput3" class="bmd-label-floating">Error input</label>
                                <input type="email" class="form-control" id="exampleInput3"/>
                                <span class="form-control-feedback">
                                    <i class="material-icons">clear</i>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-4">
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">group</i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="With Material Icons"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-4">
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="fa fa-group"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="With Font Awesome Icons"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Main;