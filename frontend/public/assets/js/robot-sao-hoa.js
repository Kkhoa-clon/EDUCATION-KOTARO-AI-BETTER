
(function() {

    document.addEventListener('DOMContentLoaded', function(){

        const homeTabBtn = document.getElementById("homeTabBtn");
        if (homeTabBtn) homeTabBtn.addEventListener('click', HomeUIModule.render);

        const imagesTabBtn = document.getElementById('imagesTabBtn');
        if (imagesTabBtn) imagesTabBtn.addEventListener('click', ImagesUIModule.render);

        const createStoryBtn = document.getElementById('createStoryBtn');
        if (createStoryBtn) createStoryBtn.addEventListener('click', ManagerModule.createStory);

        const filterForm = document.getElementById("filterForm");
        if (filterForm) {
            filterForm.addEventListener('submit', ManagerModule.search);
            filterForm.addEventListener('reset', ManagerModule.clear);
        }

        const backToSearchBtn = document.getElementById('BackToSearchBtn');
        if (backToSearchBtn) backToSearchBtn.addEventListener('click', HomeUIModule.render);

        const backToSavedImgBtn = document.getElementById('BackToSavedImgBtn');
        if (backToSavedImgBtn) backToSavedImgBtn.addEventListener('click', ImagesUIModule.render);

        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner) loadingSpinner.classList.remove("d-none");

        // Lấy thông tin các xe tự hành (rover)
        RoversDataModule.updateRoversData()
            .catch(error=>{console.log(error)})
            .finally(()=>{if (loadingSpinner) loadingSpinner.classList.add("d-none")} );

        // Lắng nghe sự kiện lọc ở trang chủ
        const roverSelect = document.getElementById('roverSelect');
        if (roverSelect) roverSelect.addEventListener('change', ManagerModule.filterRover);
        const cameraSelect = document.getElementById('cameraSelect');
        if (cameraSelect) cameraSelect.addEventListener('change', ManagerModule.filterCamera);

    });

// ---------------------------------------------------------------------------------------------------------------

const API_KEY = "ysbG3e9XHdLDfuOnLunTCJoTHIzGeMiHtdMy4eNj";
const API_ERROR = "Lỗi: Máy chủ NASA hiện không khả dụng, vui lòng thử lại sau.";
const NASA_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
const INVALID_DATE_FORMAT = "Định dạng ngày không hợp lệ: Dữ liệu bạn nhập không đúng định dạng ngày hợp lệ";
const DATE_OUT_OF_RANGE = "Ngày không nằm trong phạm vi hợp lệ, ảnh tồn tại trong khoảng";

// ---------------------------------------------------------------------------------------------------------------

    /**
     * ApiServiceModule
     *
     * Module dùng để tương tác với API Mars Rover của NASA. Cung cấp các hàm lấy thông tin rover,
     * lấy ảnh theo ngày và xử lý phản hồi từ API.
     *
     * @type {{getRoversInfo: ((function(): Promise<Array|undefined>)|*), getDateResults: (function(string): Promise<{roversWithPhotos: Array, photos: Array}>), status: ((function(*): (Promise<never>|Promise<Awaited<*>>))|*)}}
     */
    const ApiServiceModule = (function(){

        /**
         * Hàm này kiểm tra trạng thái phản hồi có hợp lệ không hoặc có lỗi xảy ra không
         * @param response
         * @returns {Promise<never>|Promise<Awaited<unknown>>}
         */
        function status(response) {

            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            }
            else {
                HomeUIModule.renderApiError();
                return Promise.reject(new Error("Không tìm thấy phản hồi nào"));
            }
        }

        /**
         * Lấy thông tin về các xe tự hành trên sao Hỏa từ API của NASA.
         *
         * Hàm này gửi yêu cầu đến API NASA để lấy dữ liệu về các xe tự hành.
         * Xử lý phản hồi, trích xuất thông tin "rovers" và xử lý lỗi nếu có.
         *
         * @async
         * @returns {Promise<Array|undefined>} Một promise trả về mảng các đối tượng rover nếu thành công, hoặc `undefined` nếu có lỗi.
         */
        const getRoversInfo = async function () {

            let answers = null;

            const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`);
            try {
                const resp = await status(response);
                answers = await resp.json();
                return answers["rovers"];

            }
            catch (err) {
                console.log(`Đã xảy ra lỗi... ${err}`);
            }
        };

        /**
         * Lấy ảnh rover theo ngày hoặc ngày gần nhất nếu không có ảnh.
         *
         * @async
         * @param {string} date - Ngày cần tìm (định dạng: "YYYY-MM-DD").
         * @returns {Promise<{roversWithPhotos: Array, photos: Array}>}
         * Một đối tượng gồm tên rover (`roversWithPhotos`) và các ảnh (`photos`).
         */
        const getDateResults = async function (date) {

            let roverNamesAndPhotos = await fetchPhotos (RoversDataModule.getRoversNames(), date);
            if (roverNamesAndPhotos.photos.length === 0) {

                // Gọi modal hiển thị không tìm thấy ảnh, sẽ tìm ảnh ở ngày gần nhất
                roverNamesAndPhotos = await getNearestDateResults(date, RoversDataModule.getRoversNames(), RoversDataModule.getMinDate(), RoversDataModule.getMaxDate());
            }
            return roverNamesAndPhotos;
        };

        /**
         * Lấy ảnh từ API NASA cho một ngày và danh sách rover.
         *
         * @async
         * @param {Array<string>} rovers - Danh sách tên rover.
         * @param {string} date - Ngày cần tìm (định dạng: "YYYY-MM-DD").
         * @returns {Promise<{roversWithPhotos: Array, photos: Array}>}
         * Đối tượng gồm:
         * - `photos` (Array): Tất cả ảnh được chụp bởi các rover.
         * - `roversWithPhotos` (Array): Tên rover kèm thông tin camera.
         */
        const fetchPhotos = async (rovers, date) => {

            // Tạo các URL sử dụng NASA_URL và URLSearchParams
            const urls = rovers.map((rover) => {
                const params = new URLSearchParams({
                    earth_date: date,
                    api_key: API_KEY,
                });
                return `${NASA_URL}${rover}/photos?${params.toString()}`;
            });

            // Tạo các promise fetch cho từng URL
            const fetchPromises = urls.map(async (url) => {
                try {
                    const response = await fetch(url);
                    const validResponse = await status(response);
                    return validResponse.json();
                } catch (err) {
                    console.log(`Lỗi khi lấy ảnh từ URL ${url}: ${err}`);
                    return null; // Trả về null nếu có lỗi
                }
            });

            try {
                const data = await Promise.all(fetchPromises);

                let allPhotos = [];
                let roversWithPhotos = []; // Mảng lưu tên rover có ảnh

                data.forEach((roverData, index) => {
                    if (roverData && roverData.photos && roverData.photos.length > 0) {
                        allPhotos = allPhotos.concat(roverData.photos); // Nối các ảnh lại

                        // Tạo đối tượng cho rover với danh sách camera
                        const roverInfo = {
                            roverName: rovers[index], // Lưu tên rover

                            // Dùng Set để lưu tên camera duy nhất (tự động loại trùng)
                            cameras: [...new Set(roverData.photos.map(photo => photo.camera.name))]
                        };

                        // Lưu thông tin rover vào roversWithPhotos
                        roversWithPhotos.push(roverInfo);
                    }
                });

                return { photos: allPhotos, roversWithPhotos }; // Trả về cả ảnh và rover có ảnh

            } catch (err) {
                console.log(`Lỗi khi xử lý kết quả fetch: ${err}`);
                return { photos: [], roversWithPhotos: [] }; // Trả về mảng rỗng nếu có lỗi
            }
        };

        /**
         * Tìm ảnh ở ngày gần nhất khi không có ảnh cho ngày đã chọn.
         *
         * @async
         * @param {string} date - Ngày ban đầu (định dạng: "YYYY-MM-DD").
         * @param {Array<string>} rovers - Danh sách tên rover.
         * @param {string} minDate - Ngày sớm nhất trong phạm vi cho phép.
         * @param {string} maxDate - Ngày muộn nhất trong phạm vi cho phép.
         * @returns {Promise<{roversWithPhotos: Array, photos: Array}|[]>}
         * Đối tượng gồm dữ liệu rover và ảnh cho ngày gần nhất, hoặc mảng rỗng nếu không có ảnh.
         */
        const getNearestDateResults = async (date, rovers, minDate, maxDate) => {

            let newDate = new Date(date);
            let roverNamesAndPhotos = [];
            let direction = 1; // 1 là ngày tiếp theo, -1 là ngày trước đó
            let attempts = 0;

            while (roverNamesAndPhotos.length === 0 && attempts < 100) {  // Giới hạn số lần thử để tránh lặp vô hạn
                newDate.setDate(newDate.getDate() + direction);
                const adjustedDate = newDate.toISOString().split('T')[0];

                if (!ValidationModule.isDateWithinRange(adjustedDate, minDate, maxDate)) {
                    return [];
                }

                roverNamesAndPhotos = await fetchPhotos(rovers, adjustedDate);
                if (roverNamesAndPhotos.photos.length > 0) {
                    return roverNamesAndPhotos;
                }

                attempts++;
                direction = direction === 1 ? -1 : 1;  // Đổi hướng sau mỗi lần thử
            }

            return [];
        };

        return{
            status,
            getRoversInfo,
            getDateResults
        };

    })();

// ---------------------------------------------------------------------------------------------------------------

    /**
     * `RoversDataModule` quản lý dữ liệu rover, bao gồm lấy thông tin rover,
     * cập nhật và lấy dữ liệu camera, cung cấp phạm vi ngày.
     *
     * Module này đóng gói chức năng tương tác với dữ liệu rover từ API NASA và cập nhật hoặc truy xuất
     * các thông tin như tên rover, camera, ngày hạ cánh.
     *
     * @type {{
     *     updateRoversData: (function(): Promise<void>),
     *     getMinDate: (function(): string),
     *     getMaxDate: (function(): string),
     *     getRoversNames: (function(): Array),
     *     getRoverCameras: (function(string): Array|undefined),
     *     updateRoversCurrentCameras: (function(Array): void)
     * }}
     */
    const RoversDataModule = (function() {

        let roversInfo = [];
        let roversNames =[];
        let roversCameras =[]; // có thể bỏ

        /**
         * Cập nhật dữ liệu rover bằng cách lấy thông tin rover và cập nhật các module liên quan.
         *
         * @async
         * @returns {Promise<void>} Trả về khi dữ liệu rover đã được lấy và cập nhật.
         */
        const updateRoversData = async function() {
            try {
                roversInfo = await ApiServiceModule.getRoversInfo();
                updateRoversNames();
            } catch (err) {
                console.log(`Lỗi khi lấy dữ liệu rover: ${err}`);
            }
        };

        /**
         * Cập nhật danh sách tên rover từ dữ liệu đã lấy.
         */
        const updateRoversNames = function() {

            // Trích xuất và trả về mảng tên rover
            roversNames = roversInfo.map(roverData => roverData.name);
        };

        /**
         * Lấy danh sách tên rover.
         *
         * @returns {Array} Mảng tên rover.
         */
        const getRoversNames = function() {
            return roversNames;
        };

        /**
         * Lấy danh sách camera cho một rover cụ thể theo tên.
         *
         * @param {string} roverName - Tên rover cần lấy camera.
         * @returns {Array|undefined} Mảng tên camera của rover, hoặc `undefined` nếu không tìm thấy.
         */
        const getRoverCameras = function(roverName) {
            return roversCameras[roverName];
        };

        /**
         * Lấy ngày hạ cánh sớm nhất từ dữ liệu rover.
         *
         * @returns {string} Ngày hạ cánh sớm nhất của rover theo định dạng "YYYY-MM-DD".
         */
        const getMinDate = function() {

            const minDate = new Date(Math.min(...roversInfo.map(rover => new Date(rover.landing_date).getTime())));
            return minDate.toISOString().split('T')[0];  // Định dạng "YYYY-MM-DD"
        };

        /**
         * Lấy ngày có dữ liệu muộn nhất từ dữ liệu rover.
         *
         * @returns {string} Ngày muộn nhất theo định dạng "YYYY-MM-DD".
         */
        const getMaxDate = function() {

            const maxDate = new Date(Math.max(...roversInfo.map(rover => new Date(rover.max_date).getTime())));
            return maxDate.toISOString().split('T')[0];  // Định dạng "YYYY-MM-DD"
        };

        /**
         * Cập nhật danh sách camera cho từng rover dựa trên dữ liệu truyền vào.
         *
         * @param {Array} roversData - Mảng thông tin rover, mỗi phần tử gồm tên rover và danh sách camera.
         */
        const updateRoversCurrentCameras = function(roversData){
            roversData.forEach(roverInfo => {
                // Dùng tên rover làm key, danh sách camera duy nhất làm value
                roversCameras[roverInfo.roverName] = roverInfo.cameras;
            });
        };


        return {
            updateRoversData,
            getMinDate,
            getMaxDate,
            getRoversNames,
            getRoverCameras,
            updateRoversCurrentCameras
        }
    })();

// ---------------------------------------------------------------------------------------------------------------

    /**
     * HomeUIModule là module UI xử lý trang chủ, hiển thị thẻ ảnh, bộ lọc,
     * thông báo lỗi và các thành phần UI liên quan đến thư viện ảnh rover.
     *
     * @type {{render, toggleInvalidDate, addCards, renderApiError, showDateModal, updateDate,
     *         renderToaster, renderSavedImageModal, toggleFilters, renderRoversDropdown,
     *         renderCameraDropdown, updateErrorMessage, renderFilteredRover, renderFilteredCamera}}
     */
    const HomeUIModule = (function() {

        const homePage = document.getElementsByClassName("homePage")[0];
        const dateBox = document.getElementById("searchDate");
        const filterContainer = document.getElementsByClassName("filterOptions")[0];

        /**
         * Bật/tắt hiển thị trang chủ và ẩn các module UI khác nếu cần.
         *
         * @param {boolean} [show=true] - Xác định có hiển thị (`true`) hay ẩn (`false`) trang chủ.
         */
        const renderHomePage = function (show=true) {
            if(show) {
                homePage.classList.remove("d-none");
                ImagesUIModule.render(false);
                StoryUIModule.render(false);
            }
            else{
                homePage.classList.add("d-none");
            }
        };

        /**
         * Bật/tắt trạng thái "không hợp lệ" của ô nhập ngày bằng cách thêm/bỏ class Bootstrap.
         *
         * @param {boolean} show - Có đánh dấu ô nhập ngày là không hợp lệ (`true`) hay không (`false`).
         */
        const toggleInvalidDate = function (show) {

            show ? dateBox.classList.add("is-invalid") : dateBox.classList.remove("is-invalid");
        };

        /**
         * Thêm các thẻ ảnh vào vùng kết quả tìm kiếm.
         *
         * @param {Array<Object>} cardsData - Mảng dữ liệu thẻ, mỗi phần tử chứa
         *       thông tin về ảnh, như nguồn ảnh, chi tiết rover, camera.
         */
        const addCards = function(cardsData) {
            const resultsContainer = document.getElementById("results"); // Vùng chứa kết quả tìm kiếm

            // Xóa kết quả cũ
            resultsContainer.innerHTML = '';

            cardsData.forEach((cardData) => {
                // Tạo HTML cho thẻ ảnh (KHÔNG còn nút Lưu)
                const cardHTML = `
                        <div class="card mb-3 shadow-sm" style="background-color: #23243a; color: #fff; border-radius: 16px; border: none; overflow: hidden;">
                            <div class="overflow-hidden" style="height: 220px; background: linear-gradient(135deg, #23243a 60%, #1c1d26 100%);">
                                <img src="${cardData.img_src}" 
                                     class="card-img-top w-100 h-100"
                                     alt="${cardData.rover.name}-image"
                                     style="object-fit: cover; border-radius: 0 0 0 0; transition: transform 0.3s;"
                                     onmouseover="this.style.transform='scale(1.05)';"
                                     onmouseout="this.style.transform='scale(1)';"
                                >
                            </div>
                            <div class="card-body px-3 py-3" style="background-color: #23243a;">
                                <ul class="list-unstyled mb-3" style="padding-left:0;">
                                    <li>
                                        <span style="font-weight: 500; color: #73d239;">Ngày Trái Đất:</span>
                                        <span>${cardData.earth_date}</span>
                                    </li>
                                    <li>
                                        <span style="font-weight: 500; color: #73d239;">Sol:</span>
                                        <span>${cardData.sol}</span>
                                    </li>
                                    <li>
                                        <span style="font-weight: 500; color: #73d239;">Camera:</span>
                                        <span>${cardData.camera.name}</span>
                                    </li>
                                    <li>
                                        <span style="font-weight: 500; color: #73d239;">Rover:</span>
                                        <span>${cardData.rover.name}</span>
                                    </li>
                                </ul>
                                <a href="${cardData.img_src}" 
                                   target="_blank" 
                                   class="btn"
                                   style="background: linear-gradient(90deg, #73d239 60%, #5bb12f 100%); color: #fff; border: none; font-weight: 500; border-radius: 8px; box-shadow: 0 2px 8px rgba(115,210,57,0.15); transition: background 0.2s;">
                                    Xem kích thước đầy đủ
                                </a>
                            </div>
                        </div>
                    `;

                // Tạo phần tử thẻ và thêm vào vùng kết quả
                const cardElement = document.createElement("div");
                cardElement.innerHTML = cardHTML;
                cardElement.className = "col-12 col-sm-6 col-md-4 col-lg-3"; // Đảm bảo chiều cao đồng nhất cho thẻ
                resultsContainer.appendChild(cardElement);
            });
        };

        /**
         * Hiển thị thông báo lỗi khi có vấn đề với API.
         */
        const renderApiError = function () {
            homePage.classList.add("d-none");

            let message = document.createElement("div");
            message.innerHTML = `<h3> ${API_ERROR}</h3>`;
            message.classList.add("mx-3");

            // Thêm thông báo phía trên homePage
            homePage.parentNode.insertBefore(message, homePage);
        } ;

        /**
         * Hiển thị modal với thông báo không có ảnh cho ngày đã chọn.
         *
         * @param {string} date - Ngày gần nhất có ảnh.
         */
        const showDateModal = function(date) {

            // Đặt thông báo cho modal động
            const message = `Không tìm thấy ảnh cho ngày này, hiển thị ảnh cho ngày gần nhất ${date}`;
            document.querySelector("#dateAndImageModal .modal-title").innerHTML = 'Thông báo';
            document.getElementById('modal-message').textContent = message;

            // Hiển thị modal bằng Bootstrap Modal API
            const modal = new bootstrap.Modal(document.getElementById('dateAndImageModal'));
            modal.show();
        };

        /**
         * Hiển thị modal với thông báo lỗi khi ảnh có ID đã được lưu.
         *
         * @param {string} imgId - ID duy nhất của ảnh đã cố lưu.
         */
        const renderSavedImageModal = function(imgId) {

            // Đặt thông báo cho modal động
            const message = `Lỗi: ảnh (id:${imgId}) đã được lưu trước đó.`;
            document.querySelector("#dateAndImageModal .modal-title").innerHTML = 'Lỗi';
            document.getElementById('modal-message').textContent = message;

            // Hiển thị modal bằng Bootstrap Modal API
            const modal = new bootstrap.Modal(document.getElementById('dateAndImageModal'));
            modal.show();
        };

        /**
         * Cập nhật giá trị trường nhập ngày trong form tìm kiếm.
         *
         * @param {string} date - Ngày mới cần đặt trong form, định dạng "YYYY-MM-DD".
         */
        const updateDate = function(date) {

            // Đổi ngày trong form thành ngày tìm thấy ảnh
            document.getElementById('searchDate').value = date;
        };

        /**
         * Hiển thị thông báo lưu thành công và tự động ẩn sau 5 giây.
         */
        const renderToaster = function () {
            // Lấy vùng chứa toast
            const toastContainer = document.getElementById('toastContainer');

            // Tạo phần tử toast mới
            const toast = document.createElement('div');
            toast.classList.add('toast');
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');

            // Thêm nội dung toast (header và body)
            toast.innerHTML = `
                    <div class="toast-header">
                        <i class="bi bi-check-circle me-2"></i>
                        <strong class="me-auto">Đã lưu</strong>
                        <small>${new Date().toLocaleTimeString()}</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Đóng"></button>
                    </div>
                    <div class="toast-body">
                        Ảnh đã được lưu vào danh sách câu chuyện của bạn.
                    </div>
                `;

            // Thêm toast mới vào vùng chứa
            toastContainer.appendChild(toast);

            // Khởi tạo và hiển thị toast
            const bootstrapToast = new bootstrap.Toast(toast);
            bootstrapToast.show();

            // Xóa toast khỏi DOM sau khi biến mất
            setTimeout(() => {
                toast.remove();
            }, 5000); // Toast biến mất sau 5 giây
        };

        /**
         * Bật/tắt hiển thị vùng bộ lọc.
         *
         * @param {boolean} show - Có hiển thị hay không.
         * @returns {void}
         */
        const toggleFilters = function (show) {

            show ? filterContainer.classList.remove("d-none") : filterContainer.classList.add("d-none");
        };

        // Tên của các phần tử được chọn:
        // - "roverSelect" được chọn ở dòng 7: const filterRoverContainer = document.getElementById("roverSelect");
        // - "cameraSelect" được chọn ở dòng 32: const filterCameraContainer = document.getElementById("cameraSelect");

        /**
         * Hiển thị dropdown danh sách tên rover trong vùng bộ lọc.
         *
         * @param {Array} rovers - Mảng đối tượng rover, mỗi đối tượng có thuộc tính 'roverName'.
         * @returns {void}
         */
        const renderRoversDropdown = function (rovers) {

            // Dòng 7: chọn phần tử với id "roverSelect"
            const filterRoverContainer = document.getElementById("roverSelect");

            filterRoverContainer.innerHTML = '';

            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Chọn rover"
            defaultOption.disabled = true;
            defaultOption.selected = true; // Đặt mặc định là đã chọn
            filterRoverContainer.appendChild(defaultOption);

            rovers.forEach((name) => {
                const option = document.createElement("option");
                option.value = name.roverName;
                option.textContent = name.roverName;
                filterRoverContainer.appendChild(option);
            });

        };

        /**
         * Hiển thị dropdown danh sách tên camera trong vùng bộ lọc.
         *
         * @param {Array} cameras - Mảng tên camera.
         * @returns {void}
         */
        const renderCameraDropdown = function (cameras) {

            // Dòng 32: chọn phần tử với id "cameraSelect"
            const filterCameraContainer = document.getElementById("cameraSelect");

            filterCameraContainer.innerHTML = '';

            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Chọn camera"
            defaultOption.disabled = true;
            defaultOption.selected = true; // Đặt mặc định là đã chọn
            filterCameraContainer.appendChild(defaultOption);

            cameras.forEach((camera) => {
                const option = document.createElement("option");
                option.value = camera;
                option.textContent = camera;
                filterCameraContainer.appendChild(option);
            });

        };

        /**
         * Cập nhật thông báo lỗi trên UI, bổ sung thông tin phạm vi ngày nếu cần.
         *
         * @param {string} msg - Thông báo lỗi cần hiển thị.
         * @returns {void}
         */
        const updateErrorMessage = function (msg) {
            if (msg === DATE_OUT_OF_RANGE) {
                msg+= ` ${RoversDataModule.getMinDate()} và ${RoversDataModule.getMaxDate()}`;
            }
            document.querySelector("#validationDateFeedback").innerHTML = msg;
        };

        /**
         * Lọc và hiển thị các thẻ rover dựa trên bộ lọc rover đã chọn.
         *
         * @param {string} currentRoverFilter - Tên rover đã chọn hoặc "All" để hiển thị tất cả.
         * @returns {void}
         */
        const renderFilteredRover = function(currentRoverFilter){

            const cardsCols = document.querySelectorAll("#results .col-12.col-sm-6.col-md-4.col-lg-3");

            cardsCols.forEach(col => {
                // Lấy tên rover từ thẻ
                const cardRoverName = col.querySelector(".card-rover").textContent.trim();
                const roverName = cardRoverName.split(": ")[1]; // Lấy phần sau "Rover: "

                // Bật/tắt hiển thị dựa trên bộ lọc rover hiện tại
                if (currentRoverFilter === "All" || roverName === currentRoverFilter) {
                    col.classList.remove("d-none"); // Hiện thẻ
                } else {
                    col.classList.add("d-none"); // Ẩn thẻ
                }
            });
        };

        /**
         * Lọc và hiển thị các thẻ rover dựa trên bộ lọc rover và camera đã chọn.
         *
         * @param {string} currentRoverFilter - Tên rover đã chọn hoặc "All" để hiển thị tất cả.
         * @param {string} currentCameraFilter - Tên camera đã chọn hoặc "All" để hiển thị tất cả.
         * @returns {void}
         */
        const renderFilteredCamera = function(currentRoverFilter,currentCameraFilter){

            const cardsCols = document.querySelectorAll("#results .col-12.col-sm-6.col-md-4.col-lg-3");

            cardsCols.forEach(col => {
                // Lấy tên rover và camera từ thẻ
                const cardRoverName = col.querySelector(".card-rover").textContent.trim();
                const roverName = cardRoverName.split(": ")[1]; // Lấy tên rover

                const cardCameraName = col.querySelector(".card-camera").textContent.trim();
                const camera = cardCameraName.split(": ")[1]; // Lấy tên camera

                // Bật/tắt hiển thị dựa trên bộ lọc camera và rover hiện tại
                if ( (currentRoverFilter === "All" || roverName === currentRoverFilter) &&
                    (currentCameraFilter === "All" || camera === currentCameraFilter)) {
                    col.classList.remove("d-none"); // Hiện thẻ
                } else {
                    col.classList.add("d-none"); // Ẩn thẻ
                }
            });
        };

        return {
            render: renderHomePage,
            toggleInvalidDate,
            addCards,
            renderApiError,
            showDateModal,
            updateDate,
            renderToaster,
            renderSavedImageModal,
            toggleFilters,
            renderRoversDropdown,
            renderCameraDropdown,
            updateErrorMessage,
            renderFilteredRover,
            renderFilteredCamera
        }

    })();

// ---------------------------------------------------------------------------------------------------------------

    /**
     * Module chịu trách nhiệm hiển thị và quản lý trang ảnh, bao gồm ảnh đã lưu và các thành phần UI liên quan.
     *
     * @type {{render, renderSavedImageCard, removeImageCard, toggleCreateStoryBtn, toggleEmptySavedImages}}
     */
    const ImagesUIModule = (function() {

        const imagesPage = document.getElementsByClassName("imagesPage")[0];
        const createStoryBtn = document.getElementById("createStoryBtn");
        const emptySavedImages = document.getElementById("noImages");

        /**
         * Bật/tắt hiển thị trang ảnh và ẩn các module UI khác nếu cần.
         * Ngoài ra, kiểm tra có ảnh đã lưu không và cập nhật UI tương ứng
         * bằng cách hiển thị hoặc ẩn nút "Tạo câu chuyện" và thông báo "Chưa có ảnh đã lưu".
         *
         * @param {boolean} [show=true] - Xác định có hiển thị (`true`) hay ẩn (`false`) trang ảnh.
         */
        const renderImagesPage = function (show=true) {
            if(show) {
                imagesPage.classList.remove("d-none");
                HomeUIModule.render(false);
                StoryUIModule.render(false);
                // XÓA toàn bộ module SavedImagesModule và các hàm liên quan đến lưu, xóa, caption, carousel, tạo câu chuyện, các sự kiện click liên quan đến lưu ảnh, xóa ảnh, caption, carousel, tạo câu chuyện.
            }
            else{
                imagesPage.classList.add("d-none");
            }
        };

        /**
         * Hiển thị thẻ ảnh đã lưu với ảnh, thông tin rover và ô nhập chú thích.
         * Bao gồm nút xóa để xóa ảnh đã lưu.
         *
         * @param {Object} cardData - Dữ liệu ảnh đã lưu.
         * @param {string} cardData.imgSrc - Đường dẫn ảnh.
         * @param {string} cardData.rover - Tên rover.
         * @param {string} cardData.camera - Tên camera.
         * @param {number} cardData.sol - Sol.
         * @param {string} cardData.earthDate - Ngày Trái Đất của ảnh.
         * @param {string} [cardData.caption] - Chú thích (nếu có).
         * @param {string} cardData.id - ID duy nhất của ảnh.
         */
        const renderSavedImageCard = function (cardData) {
            // Tạo phần tử thẻ
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.style.maxWidth = '540px';

            // Thiết lập nội dung thẻ
            card.innerHTML = `
                  <div class="row g-0">
                    <!-- Cột trái: Ảnh -->
                    <div class="col-4">
                        <div class="overflow-hidden" style="height: 200px;">
                            <img src="${cardData.imgSrc}" class="img-fluid w-100 h-100 rounded-start" alt="${cardData.rover}-image" style="object-fit: cover;">
                        </div>                    
                    </div>
            
                    <!-- Cột phải: Thông tin và nút xóa -->
                    <div class="col-8 position-relative">
                      <div class="card-body">
                        <!-- Nút xóa -->
                        <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2">
                          Xóa
                        </button>
            
                        <!-- Tiêu đề -->
                        <h5 class="card-title">${cardData.rover}</h5>            
                        <!-- Mô tả -->
                        <small class="text-body-secondary">
                            <p class="mb-1">Camera: ${cardData.camera}</p>
                            <p class="mb-1">Sol: ${cardData.sol}</p>
                            <p class="mb-1">Ngày Trái Đất: ${cardData.earthDate}</p>
                        </small>

            
                        <!-- Ô nhập chú thích -->
                        <textarea class="form-control mt-2" placeholder="Nhập chú thích tại đây" data-id="${cardData.id}">${cardData.caption || ''}</textarea>
                      </div>
                    </div>
                  </div>
                `;

            // Thêm thẻ vào vùng chứa
            const container = document.getElementById('savedImageCards');
            container.appendChild(card);

            // Lấy nút xóa và ô nhập chú thích
            const removeButton = card.querySelector('button');
            const captionInput = card.querySelector('textarea');

            // Thêm lắng nghe cho nút xóa
            removeButton.addEventListener('click',()=>ManagerModule.removeSavedImage(cardData.id));

            // Thêm lắng nghe cho ô nhập chú thích
            captionInput.addEventListener('input',ManagerModule.addCaption);


        };

        /**
         * Xóa thẻ ảnh đã lưu với ID ảnh chỉ định.
         *
         * @param {string} imageID - ID duy nhất của ảnh cần xóa.
         */
        const removeImageCard = function(imageID) {
            // Lấy tất cả thẻ ảnh động trong #savedImageCards
            const imageCards = document.querySelectorAll('#savedImageCards .card');

            imageCards.forEach((card) => {
                // Kiểm tra data-id của textarea có trùng với imageID không
                const textArea = card.querySelector('textarea');
                if (textArea && textArea.dataset.id === imageID.toString()) {
                    card.remove(); // Xóa thẻ khỏi DOM
                }
            });
        };

        /**
         * Bật/tắt hiển thị nút "Tạo câu chuyện".
         *
         * @param {boolean} show - Có hiển thị (`true`) hay ẩn (`false`) nút.
         */
        const toggleCreateStoryBtn = function(show){

            // XÓA toàn bộ module SavedImagesModule và các hàm liên quan đến lưu, xóa, caption, carousel, tạo câu chuyện, các sự kiện click liên quan đến lưu ảnh, xóa ảnh, caption, carousel, tạo câu chuyện.
        };

        /**
         * Bật/tắt hiển thị thông báo "Chưa có ảnh đã lưu".
         *
         * @param {boolean} show - Có hiển thị (`true`) hay ẩn (`false`) thông báo.
         */
        const toggleEmptySavedImages = function(show){
            show ? emptySavedImages.classList.remove("d-none") : emptySavedImages.classList.add("d-none");
        };


        return {
            render: renderImagesPage,
            renderSavedImageCard,
            removeImageCard,
            toggleCreateStoryBtn,
            toggleEmptySavedImages
        }
    })();

// ---------------------------------------------------------------------------------------------------------------

    /**
     * StoryUIModule là module UI chịu trách nhiệm hiển thị trang câu chuyện và carousel ảnh đã lưu.
     *
     * @type {{render, renderImageCarousel}}
     */
    const StoryUIModule = (function() {

        const storyPage = document.getElementsByClassName("storyPage")[0];

        /**
         * Bật/tắt hiển thị trang câu chuyện và ẩn các module UI khác nếu cần.
         *
         * @param {boolean} [show=true] - Xác định có hiển thị (`true`) hay ẩn (`false`) trang câu chuyện.
         */
        const renderStoryPage = function (show=true) {
            if(show) {
                storyPage.classList.remove("d-none");
                HomeUIModule.render(false);
                ImagesUIModule.render(false);
            }
            else{
                storyPage.classList.add("d-none");
            }
        };

        /**
         * Hiển thị carousel ảnh đã lưu, mỗi ảnh kèm tên rover,
         * chú thích và nút mở ảnh ở tab mới.
         *
         * @param {Array} savedImages - Danh sách ảnh đã lưu để hiển thị trong carousel.
         * @param {string} savedImages[].imgSrc - Đường dẫn ảnh đã lưu.
         * @param {string} savedImages[].rover - Tên rover chụp ảnh.
         * @param {string} [savedImages[].caption] - Chú thích ảnh.
         */
        const renderImageCarousel = function (savedImages) {
            const carouselInner = document.querySelector('#savedImagesCarousel .carousel-inner');

            // Xóa nội dung carousel cũ (tránh trùng lặp khi render)
            carouselInner.innerHTML = '';

            // Lặp qua các ảnh đã lưu và tạo carousel item động
            savedImages.forEach((image, index) => {
                // Tạo carousel item (mỗi ảnh và chú thích)
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) carouselItem.classList.add('active'); // Ảnh đầu tiên sẽ active mặc định

                // Tạo vùng chứa ảnh để đảm bảo kích thước đồng nhất
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('overflow-hidden', 'd-flex', 'justify-content-center', 'align-items-center');
                imageContainer.style.position = 'relative';
                imageContainer.style.width = '100%';  // Chiều rộng 100% vùng chứa
                imageContainer.style.height = '100vw';  // Chiều cao bằng chiều rộng viewport để vuông

                // Tạo thẻ ảnh
                const imgElement = document.createElement('img');
                imgElement.src = image.imgSrc;
                imgElement.classList.add('w-100', 'h-100'); // Ảnh lấp đầy vùng chứa
                imgElement.alt = `${image.rover} image`;
                imgElement.style.objectFit = 'cover'; // Giữ tỉ lệ và lấp đầy vùng vuông

                // Thêm ảnh vào vùng chứa
                imageContainer.appendChild(imgElement);

                // Tạo vùng chú thích carousel (tên rover + chú thích)
                const captionContainer = document.createElement('div');
                captionContainer.classList.add('carousel-caption', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'text-white', 'p-3');

                // Tạo tên rover
                const roverName = document.createElement('h5');
                roverName.classList.add('mb-2', 'bg-dark', 'd-inline', 'bg-opacity-50'); // Cách lề giữa tên rover và chú thích
                roverName.textContent = `${image.rover}`;

                // Tạo chú thích
                const captionText = document.createElement('p');
                captionText.classList.add('mb-2', 'bg-dark', 'bg-opacity-50', 'text-justify', 'w-100');
                captionText.textContent = image.caption || 'Chưa có chú thích';

                // Thêm tên rover và chú thích vào vùng caption
                captionContainer.appendChild(roverName);
                captionContainer.appendChild(captionText);

                // Tạo div cho nút "Mở"
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('d-flex', 'justify-content-center', 'align-items-center');

                // Tạo nút "Mở"
                const openButton = document.createElement('a');
                openButton.href = image.imgSrc;
                openButton.target = '_blank';
                openButton.classList.add('btn', 'btn-primary');
                openButton.textContent = 'Mở';

                // Thêm nút "Mở" vào vùng chứa
                buttonContainer.appendChild(openButton);
                captionContainer.appendChild(buttonContainer)

                // Thêm caption và nút vào carousel item
                carouselItem.appendChild(imageContainer);
                carouselItem.appendChild(captionContainer);

                // Thêm carousel item vào carousel-inner
                carouselInner.appendChild(carouselItem);

            });

            // Đảm bảo carousel tự động trượt
            const carouselElement = document.getElementById('savedImagesCarousel');
            carouselElement.setAttribute('data-bs-ride', 'carousel');  // Bật tự động trượt
        };

        return {
            render: renderStoryPage,
            renderImageCarousel
        }
    })();

// ---------------------------------------------------------------------------------------------------------------

    /**
     * Quản lý chức năng chính của ứng dụng liên quan đến tìm kiếm, lưu, lọc ảnh,
     * cũng như hiển thị câu chuyện. Đóng vai trò controller giữa giao diện người dùng (UI) và dữ liệu.
     *
     * @type {{search: ((function(Event): Promise<void>)|*), createStory, filterCamera, removeSavedImage, savePhoto, filterRover, clear, addCaption}}
     */
    const ManagerModule = (function() {

        let currentRoverFilter = 'All';
        let currentCameraFilter = 'All';

        /**
         * Xử lý tìm kiếm ảnh theo ngày đã chọn. Kiểm tra hợp lệ ngày, lấy ảnh và dữ liệu rover từ API,
         * cập nhật UI với kết quả, quản lý spinner. Nếu ảnh tìm được không đúng ngày đã chọn,
         * hiển thị modal với ngày đúng.
         *
         * @param {Event} event - Sự kiện submit form, dùng để ngăn hành vi mặc định.
         * @returns {Promise<void>} Promise trả về khi hoàn tất.
         */
        const searchForDateImages = async function(event){

            event.preventDefault();

            // Bật spinner
            document.querySelector("#loadingSpinner").classList.remove("d-none");

            // Lấy ngày đã chọn
            const selectedDate = document.getElementById('searchDate').value.trim();

            try {
                if (ValidationModule.isDateValid(selectedDate)) {

                    HomeUIModule.toggleInvalidDate(false);

                    // Lấy ảnh đã tìm thấy
                    const photosAndRoversNames = await ApiServiceModule.getDateResults(selectedDate);

                    // Kiểm tra ảnh tìm được có đúng ngày đã chọn không, nếu không tức là đã tìm ngày gần nhất
                    const foundPhotosDate = photosAndRoversNames.photos[0].earth_date;

                    if (foundPhotosDate !== selectedDate) {
                        HomeUIModule.showDateModal(foundPhotosDate);
                        HomeUIModule.updateDate(foundPhotosDate);
                    }

                    RoversDataModule.updateRoversCurrentCameras(photosAndRoversNames.roversWithPhotos);

                    // Tìm các camera duy nhất
                    const cameras = findUniqueCameras(photosAndRoversNames.roversWithPhotos);

                    // Gọi homeUI để tạo dropdown phù hợp
                    HomeUIModule.toggleFilters(true);
                    HomeUIModule.renderRoversDropdown(photosAndRoversNames.roversWithPhotos);
                    HomeUIModule.renderCameraDropdown(cameras);

                    // Thêm ảnh vào DOM
                    HomeUIModule.addCards(photosAndRoversNames.photos);
                }
                else {
                    HomeUIModule.toggleInvalidDate(true);
                    clearFiltersAndResults();
                }
            }
            catch (err) {
                console.log(err);
            }
            finally {
                // Tắt spinner
                document.querySelector("#loadingSpinner").classList.add("d-none");
            }
        };

        /**
         * Gọi hàm xóa bộ lọc và kết quả, đồng thời ẩn thông báo lỗi ngày không hợp lệ.
         */
        const clear = function () {

            clearFiltersAndResults();
            HomeUIModule.toggleInvalidDate(false);

        };

        /**
         * Xóa tất cả thẻ động khỏi vùng kết quả và ẩn bộ lọc.
         */
        const clearFiltersAndResults = function () {

            // Lấy vùng kết quả theo ID và xóa nội dung
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Xóa tất cả thẻ động

            // Ẩn bộ lọc
            HomeUIModule.toggleFilters(false);
        }

        /**
         * Hiển thị trang câu chuyện và carousel ảnh đã lưu.
         * Gọi `render` từ `StoryUIModule` để hiển thị trang câu chuyện và dùng `renderImageCarousel`
         * để hiển thị carousel ảnh đã lưu.
         */
        const createStory = function () {

            StoryUIModule.render(true);
            StoryUIModule.renderImageCarousel(SavedImagesModule.getSavedImages());

        };

        /**
         * Lưu ảnh vào bộ sưu tập nếu chưa lưu.
         * Nếu ảnh chưa lưu, thêm dữ liệu ảnh vào danh sách và hiển thị trên trang ảnh.
         * Nếu đã lưu, hiển thị modal thông báo ảnh đã được lưu.
         *
         * @param {Object} cardData - Dữ liệu ảnh cần lưu.
         * @param {string} cardData.id - ID duy nhất của ảnh.
         * @param {Object} cardData.camera - Dữ liệu camera chụp ảnh.
         * @param {string} cardData.camera.name - Tên camera.
         * @param {string} cardData.earth_date - Ngày Trái Đất chụp ảnh.
         * @param {string} cardData.sol - Sol (ngày trên sao Hỏa).
         * @param {string} cardData.img_src - Đường dẫn ảnh.
         * @param {Object} cardData.rover - Dữ liệu rover chụp ảnh.
         * @param {string} cardData.rover.name - Tên rover.
         */
        const savePhoto = function(cardData) {

            // XÓA toàn bộ module SavedImagesModule và các hàm liên quan đến lưu, xóa, caption, carousel, tạo câu chuyện, các sự kiện click liên quan đến lưu ảnh, xóa ảnh, caption, carousel, tạo câu chuyện.
        };

        /**
         * Xóa ảnh đã lưu khỏi bộ sưu tập và cập nhật UI.
         * Nếu xóa hết ảnh, ẩn nút "Tạo câu chuyện" và hiển thị trạng thái rỗng.
         *
         * @param {string} cardID - ID ảnh cần xóa khỏi bộ sưu tập.
         */
        const removeSavedImage = function(cardID){

            // Xóa khỏi danh sách ảnh đã lưu
            // XÓA toàn bộ module SavedImagesModule và các hàm liên quan đến lưu, xóa, caption, carousel, tạo câu chuyện, các sự kiện click liên quan đến lưu ảnh, xóa ảnh, caption, carousel, tạo câu chuyện.

            // Nếu người dùng xóa hết ảnh
            if(SavedImagesModule.getSavedImages().length === 0){
                ImagesUIModule.toggleEmptySavedImages(true);
                ImagesUIModule.toggleCreateStoryBtn(false);
            }

        };

        /**
         * Thêm chú thích cho ảnh đã lưu dựa trên nhập liệu của người dùng.
         * Chú thích sẽ được lưu vào module SavedImages.
         *
         * @param {Event} event - Sự kiện nhập liệu, chứa giá trị chú thích và ID ảnh.
         */
        const addCaption= function(event){
            const caption = event.target.value;
            const imageID = event.target.dataset.id;
            // XÓA toàn bộ module SavedImagesModule và các hàm liên quan đến lưu, xóa, caption, carousel, tạo câu chuyện, các sự kiện click liên quan đến lưu ảnh, xóa ảnh, caption, carousel, tạo câu chuyện.
        };

        /**
         * Hàm nhận mảng đối tượng, mỗi đối tượng có roverName và mảng Cameras
         * chứa các camera có ảnh, và tìm các camera duy nhất.
         * @param rovers
         */
        const findUniqueCameras = function (rovers) {

            let cameras = new Set(); // Dùng Set để loại trùng

            rovers.forEach(rover => {
                const roverCameras = rover.cameras
                roverCameras.forEach(camera => {
                    cameras.add(camera); // Thêm từng camera vào Set
                });
            });

            // Chuyển Set về mảng
            return [...cameras];
        };

        /**
         * Lọc ảnh theo rover đã chọn và cập nhật kết quả hiển thị.
         * Đồng thời cập nhật dropdown camera theo rover đã chọn.
         *
         * @param {Event} event - Sự kiện chọn rover, chứa giá trị rover đã chọn.
         */
        const filterRover = function (event) {

            event.preventDefault(); // Ngăn submit form và reload trang
            currentRoverFilter = event.target.value;

            // Chỉ lọc thẻ trong vùng #results
            HomeUIModule.renderFilteredRover(currentRoverFilter);

            // Kiểm tra rover có camera không trước khi gọi renderCameraDropdown
            const roverCameras = RoversDataModule.getRoverCameras(currentRoverFilter);
            if (roverCameras && roverCameras.length > 0) {
                HomeUIModule.renderCameraDropdown(roverCameras);
            }

        };

        /**
         * Lọc ảnh theo camera đã chọn và cập nhật kết quả hiển thị.
         *
         * @param {Event} event - Sự kiện chọn camera, chứa giá trị camera đã chọn.
         */
        const filterCamera = function (event) {

            event.preventDefault(); // Ngăn submit form và reload trang
            currentCameraFilter = event.target.value;

            // Chỉ lọc thẻ trong vùng #results
            HomeUIModule.renderFilteredCamera(currentRoverFilter,currentCameraFilter);

        };


        return {
            search: searchForDateImages,
            clear,
            createStory,
            savePhoto,
            removeSavedImage,
            addCaption,
            filterRover,
            filterCamera
        }
    })();

// ---------------------------------------------------------------------------------------------------------------

    /**
     * ValidationModule cung cấp các hàm tiện ích kiểm tra hợp lệ ngày, định dạng và phạm vi ngày.
     *
     * @type {{isDateValid: ((function(string): boolean)|*), isDateWithinRange: (function(string, string, string): *)}}
     */
    const ValidationModule = (function() {

        /**
         * Kiểm tra một ngày có nằm trong phạm vi cho phép không.
         *
         * @param {string} date - Ngày cần kiểm tra (định dạng: "YYYY-MM-DD").
         * @param {string} minDate - Ngày nhỏ nhất cho phép (định dạng: "YYYY-MM-DD").
         * @param {string} maxDate - Ngày lớn nhất cho phép (định dạng: "YYYY-MM-DD").
         * @returns {boolean} `true` nếu ngày hợp lệ, ngược lại `false`.
         */
        const isDateWithinRange = (date, minDate, maxDate) => {

            const dateObj = new Date(date);
            const minDateObj = new Date(minDate);
            const maxDateObj = new Date(maxDate);
            return dateObj >= minDateObj && dateObj <= maxDateObj;

        };


        /**
         * Kiểm tra định dạng ngày và ngày có nằm trong phạm vi cho phép không.
         *
         * @param {string} date - Ngày cần kiểm tra (ví dụ: 'YYYY-MM-DD').
         * @returns {boolean} - `true` nếu hợp lệ, `false` nếu không.
         */
        const isDateValid = function(date){

            // Kiểm tra định dạng ngày hợp lệ
            if (!isValidDateFormat(date)) {
                HomeUIModule.updateErrorMessage(INVALID_DATE_FORMAT);
                return false;
            }

            // Đảm bảo ngày nằm trong phạm vi hợp lệ
            if (! (isDateWithinRange(date, RoversDataModule.getMinDate(),RoversDataModule.getMaxDate()))) {
                HomeUIModule.updateErrorMessage(DATE_OUT_OF_RANGE);
                return false;
            }

            return true;
        };

        /**
         * Kiểm tra đầu vào có đúng định dạng ngày không.
         *
         * @param {string} input - Chuỗi ngày cần kiểm tra.
         * @returns {boolean} - `true` nếu hợp lệ, `false` nếu không.
         */
        const isValidDateFormat = function(input) {

            // Thử parse input thành đối tượng Date
            const parsedDate = new Date(input);
            return !isNaN(parsedDate.getTime()); // Kiểm tra ngày hợp lệ
        };

        return {
            isDateValid,
            isDateWithinRange
        }
    })();

// ---------------------------------------------------------------------------------------------------------------

    /**
     * Module quản lý ảnh đã lưu, bao gồm thêm, xóa, cập nhật dữ liệu ảnh.
     * Cung cấp các hàm quản lý bộ sưu tập ảnh đã lưu như thêm ảnh, thêm chú thích,
     * kiểm tra ảnh đã lưu, xóa ảnh.
     *
     * @type {{removeImage, isSaved: (function(string): boolean), addImage, addCaption, getSavedImages: (function(): *[])}}
     */
    const SavedImagesModule = (function() {

        let savedImages = [];

        /**
         * Thêm ảnh mới vào bộ sưu tập ảnh đã lưu.
         *
         * @param {Object} imageData - Dữ liệu ảnh cần thêm.
         * @param {string} imageData.id - ID duy nhất của ảnh.
         * @param {string} imageData.camera - Tên camera chụp ảnh.
         * @param {string} imageData.earthDate - Ngày Trái Đất chụp ảnh.
         * @param {string} imageData.sol - Sol (ngày trên sao Hỏa).
         * @param {string} imageData.imgSrc - Đường dẫn ảnh.
         * @param {string} imageData.rover - Tên rover chụp ảnh.
         * @param {string} imageData.caption - Chú thích (nếu có).
         */
        const addImage = function (imageData){

            savedImages.push(imageData);
        };

        /**
         * Thêm hoặc cập nhật chú thích cho ảnh trong bộ sưu tập.
         * Nếu tìm thấy ảnh theo ID, cập nhật chú thích. Nếu không, log lỗi.
         *
         * @param {string} imageID - ID ảnh cần thêm/cập nhật chú thích.
         * @param {string} caption - Chú thích cần thêm/cập nhật.
         */
        const addCaption = function (imageID, caption) {

            // Tìm ảnh trong mảng savedImages theo id
            const image = savedImages.find(image => image.id.toString() === imageID);
            if (image) {
                // Cập nhật trường caption của ảnh
                image.caption = caption;
            } else {
                console.error(`Không tìm thấy ảnh với ID ${imageID}.`);
            }
        };

        /**
         * Lấy tất cả ảnh đã lưu trong bộ sưu tập.
         *
         * @returns {Array} - Mảng ảnh đã lưu.
         */
        const getSavedImages = function(){

            return savedImages;
        };

        /**
         * Kiểm tra ảnh đã được lưu trong bộ sưu tập chưa.
         *
         * @param {string} imageID - ID ảnh cần kiểm tra.
         * @returns {boolean} - `true` nếu đã lưu, `false` nếu chưa.
         */
        const isSaved = function(imageID) {

            return savedImages.some(image => image.id === imageID);
        };

        /**
         * Xóa ảnh khỏi bộ sưu tập dựa trên ID.
         *
         * @param {string} imageID - ID ảnh cần xóa.
         */
        const removeImage = function(imageID){

            const index = savedImages.findIndex(img => img.id === imageID);
            if (index !== -1) {
                savedImages.splice(index, 1); // Xóa ảnh theo id
            }
        };

        return {
            addImage,
            addCaption,
            getSavedImages,
            isSaved,
            removeImage
        }
    })();
})();