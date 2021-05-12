var title = "Yes"

var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

    console.log(condition)