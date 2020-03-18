const Database = use('Database');

async function deleteOldMatchs() {
  try {
    const days = new Date();
    days.setDate(days.getDate());

    const time = days - 2628000000; // 1 Month miliseconds
    const date = new Date(time);

    const oi = await Database.from('matchlists')
      .where('created_at', '<', date)
      .delete();
    return oi;
  } catch (err) {
    return err;
  }
}

module.exports = deleteOldMatchs;
