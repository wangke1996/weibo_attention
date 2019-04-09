import pickle as pkl


def get_user_info(query):
    gender = {'男': 0.33333, '女': 0.66667}
    with open('backend/analysisModule/texts.txt', 'r', encoding='utf8') as f:
        weibos = f.readlines()
    with open('backend/analysisModule/weiboatt.pkl', 'rb') as f:
        weibo_atts = pkl.load(f).tolist()
    with open('backend/analysisModule/wordatt.pkl', 'rb') as f:
        word_atts = pkl.load(f).tolist()
    weiboData = {'weibo': [], 'attention': []}
    for weibo, word_att, weibo_att in zip(weibos, word_atts, weibo_atts):
        split_weibo = weibo.split('#TAB#')
        if len(split_weibo) != 4:
            print('ignored wrong weibo data: %s' % weibo)
            continue
        name = split_weibo[0]
        content = split_weibo[2]
        weiboData['weibo'].append({'name': name, 'content': content, 'attention': word_att})
        weiboData['attention'].append(weibo_att)
    return {'gender': gender, 'weiboData': weiboData}
