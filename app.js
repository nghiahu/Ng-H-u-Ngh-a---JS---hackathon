let currentEnrollCode = "";
let isEnrollValid = false;
let totalRevenue = 0;
let totalEnrollments = 0;

let choice;
do {

    console.log("=====================================================");
    console.log("       HỆ THỐNG TUYỂN SINH BRIGHTWAY ENGLISH");
    console.log("=====================================================");
    console.log("1. Nhập và kiểm chuẩn mã đăng ký");
    console.log("2. Tính học phí khóa học");
    console.log("3. Thẩm định số báo danh may mắn");
    console.log("0. Thoát chương trình");
    console.log("=====================================================");

    choice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 3): ");

    if (choice !== null) {
        choice = choice.trim();
    }

    switch (choice) {
        case "1": {
            currentEnrollCode = "";
            isEnrollValid = false;

            const rawEnrollCode = prompt("Nhập chuỗi mã đăng ký: ");
            if (rawEnrollCode === null) {
                console.log("Lỗi: Chưa nhập mã đăng ký");
                break;
            }
            const normalizedEnrollCode = rawEnrollCode.trim().toUpperCase();
            if (normalizedEnrollCode === "") {
                console.log("Lỗi: Chưa nhập mã đăng ký");
            } else if (normalizedEnrollCode.length < 6) {
                console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
            } else if (!normalizedEnrollCode.startsWith("ENG-")) {
                console.log("Lỗi: Sai tiền tố 'ENG-'");
            } else if (normalizedEnrollCode.includes(" ")) {
                console.log("Lỗi: Chứa khoảng trắng ở giữa");
            } else {
                currentEnrollCode = normalizedEnrollCode;
                isEnrollValid = true;

                console.log("Mã đăng ký hợp lệ:", currentEnrollCode);
                console.log("Kiểm chuẩn mã đăng ký thành công!");
            }

            break;
        }
        case "2": {
            if (isEnrollValid !== true) {
                console.log("Chưa có mã đăng ký hợp lệ. Vui lòng chọn Case 1 trước.");
                break;
            }

            let courseCount;
            let pricePerCourse;
            let isCourseCountValid = false;
            let isPricePerCourseValid = false;
            let isTransactionCancelled = false;
            while (!isCourseCountValid) {
                const rawCourseCount = prompt("Nhập số khóa học: ");


                if (rawCourseCount === null) {
                    console.log("Đã hủy giao dịch.");
                    isTransactionCancelled = true;
                    break;
                }

                const trimmedCourseCount = rawCourseCount.trim();
                courseCount = Number(trimmedCourseCount);

                if (
                    trimmedCourseCount === "" ||
                    Number.isNaN(courseCount) ||
                    !Number.isInteger(courseCount) ||
                    courseCount <= 0
                ) {
                    console.log("Lỗi: Số khóa học phải là số nguyên > 0.");
                } else {
                    isCourseCountValid = true;
                }
            }

            if (isTransactionCancelled) {
                break;
            }

            while (!isPricePerCourseValid) {
                const rawPricePerCourse = prompt("Nhập học phí mỗi khóa (VNĐ): ");
                if (rawPricePerCourse === null) {
                    console.log("Đã hủy giao dịch.");
                    isTransactionCancelled = true;
                    break;
                }

                const trimmedPricePerCourse = rawPricePerCourse.trim();
                pricePerCourse = Number(trimmedPricePerCourse);

                if (
                    trimmedPricePerCourse === "" ||
                    Number.isNaN(pricePerCourse) ||
                    !Number.isInteger(pricePerCourse) ||
                    pricePerCourse <= 0
                ) {
                    console.log("Lỗi: Học phí phải là số nguyên > 0.");
                } else {
                    isPricePerCourseValid = true;
                }
            }
            if (isTransactionCancelled) {
                break;
            }

            const baseCost = courseCount * pricePerCourse;
            let discount = 0;

            if (courseCount >= 4) {
                discount = Math.round(baseCost * 0.1);
            }
            const materialFee = Math.round((baseCost - discount) * 0.08);

            const totalPay = (baseCost - discount) + materialFee;
            totalRevenue += totalPay;
            totalEnrollments++;
            const paidEnrollCode = currentEnrollCode;

            currentEnrollCode = "";
            isEnrollValid = false;

            console.log("");
            console.log("=====================================================");
            console.log("                 BIÊN LAI HỌC PHÍ");
            console.log("=====================================================");
            console.log("Mã đăng ký              :", paidEnrollCode);
            console.log("Số khóa học             :", courseCount);
            console.log(`Học phí mỗi khóa        : ${pricePerCourse} `);
            console.log(`Chi phí cơ sở           : ${baseCost} `);
            console.log(`Tiền giảm giá           : ${discount}`);
            console.log(`Phí giáo trình và tài liệu: ${materialFee}`);
            console.log(`Tổng thanh toán         : ${totalPay}`);
            console.log("=====================================================");

            break;
        }
        case "3": {
            const rawLuckyNumber = prompt("Nhập số báo danh của học viên: ");
            if (rawLuckyNumber === null) {
                console.log("Lỗi: Số báo danh không hợp lệ.");
                break;
            }
            const luckyNumber = rawLuckyNumber.trim();

            if (
                luckyNumber === "" ||
                luckyNumber.length < 2 ||
                !/^[0-9]+$/.test(luckyNumber) ||
                /^0+$/.test(luckyNumber)
            ) {
                console.log("Lỗi: Số báo danh không hợp lệ.");
                break;
            }

            let reversedNumber = "";

            for (let i = luckyNumber.length - 1; i >= 0; i--) {
                reversedNumber += luckyNumber[i];
            }
            const isPalindrome = luckyNumber === reversedNumber;
            let digitSum = 0;

            for (let i = 0; i < luckyNumber.length; i++) {
                digitSum += Number(luckyNumber[i]);
            }
            const isDivisibleByNine = digitSum % 9 === 0;
            let prize;

            if (isPalindrome && isDivisibleByNine) {
                prize = "Giải Đặc biệt - Học bổng 1 khóa học trị giá 3.000.000 VNĐ";
            } else if (isPalindrome) {
                prize = "Giải Nhất - Bộ giáo trình luyện thi trị giá 350.000 VNĐ";
            } else if (isDivisibleByNine) {
                prize = "Giải Nhì - Voucher giảm 100.000 VNĐ học phí khóa kế tiếp";
            } else {
                prize = "Không trúng thưởng";
            }

            console.log("");
            console.log("=====================================================");
            console.log("             KẾT QUẢ SỐ BÁO DANH MAY MẮN");
            console.log("=====================================================");
            console.log("Mã số gốc  :", luckyNumber);
            console.log("Mã đảo ngược   :", reversedNumber);
            console.log("Tổng chữ số    :", digitSum);
            console.log(
                "Chia hết cho 9         :",
                isDivisibleByNine ? "Có" : "Không"
            );
            console.log("Kết quả                :", prize);
            console.log("=====================================================");

            break;
        }
        case "0": {
            console.log("");
            console.log("==================================================");
            console.log("          BÁO CÁO TỔNG KẾT CA TUYỂN SINH");
            console.log("==================================================");
            console.log(
                "Tổng số lượt đăng ký đã thanh toán :",
                totalEnrollments
            );

            if (totalEnrollments === 0) {
                console.log("Chưa phát sinh lượt đăng ký nào trong ca");
            } else {
                const averageRevenue = Math.round(
                    totalRevenue / totalEnrollments
                );

                console.log(
                    `Tổng doanh thu: ${totalRevenue}`);
                console.log(
                    `Doanh thu trung bình: ${averageRevenue}`);
            }

            console.log("==================================================");
            console.log("Cảm ơn bạn đã sử dụng hệ thống!");
            console.log("Chương trình đã kết thúc.");

            break;
        }
        default: {
            console.log("Lựa chọn không hợp lệ, vui lòng nhập lại.");
            break;
        }
    }
} while (choice !== "0");