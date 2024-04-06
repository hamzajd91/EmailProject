import slugify from "slugify";

// Extend slugify
slugify.extend({".": "dot"});

const urlGenerate = (string: string) => {
  return slugify(string, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    // locale: "vi", // language code of the locale to use
  });
};

export default urlGenerate;
