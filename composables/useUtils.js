export const fuzzy = (items, key) => {
  //let searchByCategory = fuzzy(list, 'category');

  return (query) => {
    let words = query.toLowerCase().split(" ");

    return items.filter((item) => {
      let normalizedTerm = item[key].toLowerCase();

      return words.every((word) => {
        return normalizedTerm.indexOf(word) > -1;
      });
    });
  };
};

export const getRelativeTime = (timestamp) => {
  const date = new Date(timestamp);
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diff = Date.now() - date;

  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  if (days > 7) {
    // return formatter.format(-days, 'day');
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  } else if (days > 14) {
    return formatter.format(-days, 'day');
  } else if (hours > 1) {
    return formatter.format(-hours, 'hour');
  } else if (minutes > 1) {
    return formatter.format(-minutes, 'minute');
  } else {
    console.log("else")
    return formatter.format(-seconds, 'second');
  }
}