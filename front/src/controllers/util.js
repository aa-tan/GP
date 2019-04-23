exports.buildQuery = (req, postid) => {
    console.log(postid)
    return {'id':postid.toString(), 'speedUser':req.body.speedUser, 'speedPass':req.body.speedPass}
}
