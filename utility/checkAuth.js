// Kiểm tra xem trong HTTP request có chứa giá trị "Bearer" hay không. -> dùng để chứng thực.

verify = (req) => {
    let verified = false

    for (var i = 0; i < req.rawHeaders.length; i++) {
        if (req.rawHeaders[i].search("Bearer") !== -1) {

            // verify token - TBA
            verified = true
        }
    }

    return verified;
}

module.exports.verify = verify;