import api from '@/api'

export const addRuleHistory = async (projectId, ruleId, userName, time, event) => {
    try {
        const res = await api.addRuleHistoryRequest({
            projectId,
            ruleId,
            userName,
            time,
            event
        })
        if (res.code === 200) {
            return res.data
        }
        return false
    } catch {
        return false
    }
}

export const extractObjects = (data) => {
    let result = [];
  
    function traverse(nodes) {
      for (let node of nodes) {
        if (node.isFolder && node.children) {
          traverse(node.children)
        } else {
          result.push(node);
        }
      }
    }
  
    traverse(data);
    return result;
  }