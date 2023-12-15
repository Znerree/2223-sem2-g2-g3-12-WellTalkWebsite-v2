type LinkifyProps = {
  children: string;
};

const Linkify = ({ children }: LinkifyProps) => {
  const isUrl = (word: string) => {
    const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return word.match(urlPattern);
  };

  const addMarkup = (word: string) => {
    return isUrl(word) ? `<a href="${word}" class="linkify-link">${word}</a>` : word;
  };

  const words = children.split(" ");
  const formatedWords = words.map((w, i) => addMarkup(w));
  const html = formatedWords.join(" ");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Linkify;
