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


export function mapStructureToString(structure) {
  if (!Array.isArray(structure)) {
    return "";
  }

  function mapConditionToString(condition) {
    if (!condition || typeof condition !== "object") {
      return "";
    }

    const left = (condition.left && condition.left.libId)
      ? `#${condition.left.libId}#${condition.left.varName || ""}#`
      : "";
    const operator = condition.operator || "";
    const right = (condition.right && condition.right.libId)
      ? `#${condition.right.libId}#${condition.right.varName || ""}#`
      : "";

    return `${left}${operator}${right}`;
  }

  function mapBodyToString(body) {
    if (!Array.isArray(body)) {
      return "";
    }

    return body
      .map((item) => {
        if (item.type === "if" || item.type === "else if") {
          const conditions = item.conditions
            .map(mapConditionToString)
            .join("")

          const nestedBody = mapBodyToString(item.body);

          return `${item.type}(${conditions}){${nestedBody}}`;
        } else if (item.type === "else") {
          return `${item.type}{${mapBodyToString(item.body)}}`;
        } else if (item.type === "calculate") {
          const received = `#${item.received.libId}#${item.received.varName}#`;
          const addStr = mapConditionToString(item.calculate)

          return `#${received}=${addStr}`;
        } else if (item.type === "print") {
          const received = `#${item.received.libId}#${item.received.varName}#`;

          return "$" + `${received}$`;
        }

        return "";
      })
      .join(";");
  }

  const result = structure
    .map((item) => {
      if (item.type === "if" || item.type === "else if") {
        const conditions = item.conditions
          .map(mapConditionToString)
          .join("")

        const body = mapBodyToString(item.body);

        return `${item.type}(${conditions}){${body}}`;
      } else if (item.type === "else") {
        return `${item.type}{${mapBodyToString(item.body)}}`;
      }

      return "";
    })
    .join("");

  return result;
}