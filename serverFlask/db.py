import sqlite3

def create_connection():
    conn = None
    try:
        conn = sqlite3.connect('./../db/mydb.db', check_same_thread=False)
        print("connected")
        return conn
    except sqlite3.Error as e:
        print("err connection " + e)
    return conn
def create_table_user(conn):
    conn.execute('CREATE TABLE users (name TEXT, age TEXT, cv_result INT)')
    print ("Table created successfully")

def insert_data(conn , data):
    with conn as con:
        cur = con.cursor()
        cur.execute('INSERT INTO users (name, age, cv_result) values (?,?,?)', data)

def create_table_param(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except sqlite3.Error as e:
        print("err create tables" + e)
def drop_tables(conn , name_table):
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    if(cursor.fetchall()):
        cursor.execute("DROP TABLE " + name_table)
        print("Table " + name_table + " droped")

def view_db(conn , table_name):
    cur = conn.cursor()
    cur.execute("SELECT * FROM " + table_name)
    record = cur.fetchall()
    print("show OK " )
    return record


if __name__ == '__main__':
    conn = create_connection()
    drop_tables(conn, "users")
    create_table_user(conn)
    data = ['duc', '21', 1 ]
    print(data[2])
    insert_data(conn, data)
    print(view_db(conn, "users"))
    conn.close()