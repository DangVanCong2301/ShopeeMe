function getAPIUserOrder() {
    setOrderStatus();
}
getAPIUserOrder();

function setOrderStatus() {
    let htmlOrderStatus = "";
    htmlOrderStatus += 
    `
                    <div class="order__header">
                        <div class="order__body-header-back">
                            <i class="uil uil-angle-left-b order__body-header-back-icon"></i>
                            <div class="order__body-header-back-text">TRỞ LẠI</div>
                        </div>
                        <div class="order__body-header-text">
                            <div class="order__body-header-code">
                                MÃ ĐƠN HÀNG.123ABCZYZ123
                            </div>
                            <span class="order__body-header-text">|</span>
                            <div class="order__body-header-status">
                                ĐƠN HÀNG ĐÃ HOÀN THÀNH
                            </div>
                        </div>
                    </div>
                    <div class="order__prevent">
                        <div class="order__prevent-box order__prevent-box-left"></div>
                        <div class="order__prevent-box order__prevent-box-right"></div>
                    </div>
                    <div class="order__stage">
                        <div class="order__stage-list">
                            <div class="order__stage-item">
                                <div class="order__stage-rounder active">
                                    <i class="uil uil-clipboard-alt order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đã đã đặt hàng</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                            <div class="order__stage-line line-1"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder">
                                    <i class="uil uil-bill order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đơn đã xác nhận thanh toán</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                            <div class="order__stage-line line-2"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder">
                                    <i class="uil uil-truck order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đã giao cho ĐVVC</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                            <div class="order__stage-line line-3"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder">
                                    <i class="uil uil-box order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đã nhận được hàng</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                            <div class="order__stage-line line-4"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder">
                                    <i class="uil uil-star order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đơn hàng đã hoàn thành</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="order__prevent">
                        <div class="order__prevent-box order__prevent-box-left"></div>
                        <div class="order__prevent-box order__prevent-box-right"></div>
                    </div>
                    <div class="order__repurchase">
                        <div class="order__repurchase-thank">Cảm ơn bạn đã mua sắp tại F4 Shop!</div>
                        <button class="btn btn--primary">Mua lại</button>
                    </div>
                    <div class="order__prevent">
                        <div class="order__prevent-box order__prevent-box-left"></div>
                        <div class="order__prevent-box order__prevent-box-right"></div>
                    </div>
                    <div class="order__contact">
                        <a href="#" class="btn order__contact-btn">Liên hệ người bán</a>
                    </div>
    `;
    document.querySelector(".order__status").innerHTML = htmlOrderStatus;
}